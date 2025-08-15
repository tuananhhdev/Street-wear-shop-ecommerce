import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RolePermission, RolePermissionDocument } from './schema/role-permission.schema';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { FindAllRolePermissionsDto } from './dto/find-all-role-permissions.dto';
import { SoftDeleteDto } from './dto/soft-delete.dto';

@Injectable()
export class RolePermissionsService {
  constructor(
    @InjectModel(RolePermission.name) private rolePermissionModel: Model<RolePermissionDocument>
  ) {}

  async findAll(query: FindAllRolePermissionsDto) {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const filter: any = { isDeleted: false };
    
    if (query.roleId) {
      filter.roleId = query.roleId;
    }

    if (query.permissionId) {
      filter.permissionId = query.permissionId;
    }

    if (query.isActive !== undefined) {
      filter.isActive = query.isActive;
    }

    const [data, total] = await Promise.all([
      this.rolePermissionModel
        .find(filter)
        .skip(skip)
        .limit(pageSize)
        .populate('roleId', 'name description -_id')
        .populate('permissionId', 'name key endpoint method module -_id')
        .select('-__v -isDeleted -deletedBy -deletedAt')
        .sort({ createdAt: -1 })
        .lean(),
      this.rolePermissionModel.countDocuments(filter),
    ]);

    return {
      items: data,
      pagination: {
        currentPage: page,
        itemsPerPage: pageSize,
        totalItems: total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async findOne(id: string) {
    const rolePermission = await this.rolePermissionModel
      .findOne({ _id: id, isDeleted: false })
      .populate('roleId', 'name description -_id')
      .populate('permissionId', 'name key endpoint method module -_id')
      .select('-__v -isDeleted -deletedBy -deletedAt')
      .lean();
      
    if (!rolePermission) {
      throw new NotFoundException('Không tìm thấy phân quyền với ID này');
    }
    
    return rolePermission;
  }

  async create(body: CreateRolePermissionDto) {
    const { roleId, permissionId } = body;
    
    // Kiểm tra roleId và permissionId đã tồn tại chưa
    const existingRolePermission = await this.rolePermissionModel
      .findOne({ roleId, permissionId, isDeleted: false })
      .lean();
      
    if (existingRolePermission) {
      throw new ConflictException('Phân quyền này đã tồn tại');
    }

    const newRolePermission = await this.rolePermissionModel.create(body);
    
    // Populate để trả về thông tin đầy đủ
    const populatedRolePermission = await this.rolePermissionModel
      .findById(newRolePermission._id)
      .populate('roleId', 'name description -_id')
      .populate('permissionId', 'name key endpoint method module -_id')
      .select('-__v -isDeleted -deletedBy -deletedAt')
      .lean();

    return populatedRolePermission;
  }

  async update(id: string, body: UpdateRolePermissionDto) {
    const rolePermissionExists = await this.rolePermissionModel
      .findOne({ _id: id, isDeleted: false })
      .lean();
      
    if (!rolePermissionExists) {
      throw new NotFoundException('Không tìm thấy phân quyền với ID này');
    }

    // Kiểm tra roleId và permissionId trùng (nếu có thay đổi)
    if (body.roleId || body.permissionId) {
      const roleId = body.roleId || rolePermissionExists.roleId;
      const permissionId = body.permissionId || rolePermissionExists.permissionId;
      
      const duplicateExists = await this.rolePermissionModel
        .findOne({ 
          roleId, 
          permissionId, 
          isDeleted: false, 
          _id: { $ne: id } 
        })
        .lean();
        
      if (duplicateExists) {
        throw new ConflictException('Phân quyền này đã tồn tại');
      }
    }

    const updatedRolePermission = await this.rolePermissionModel
      .findByIdAndUpdate(id, { $set: body }, { new: true })
      .populate('roleId', 'name description -_id')
      .populate('permissionId', 'name key endpoint method module -_id')
      .select('-__v -isDeleted -deletedBy -deletedAt')
      .lean();

    return updatedRolePermission;
  }

  async softDelete(id: string, body: SoftDeleteDto) {
    const rolePermissionExists = await this.rolePermissionModel
      .findOne({ _id: id, isDeleted: false })
      .lean();
      
    if (!rolePermissionExists) {
      throw new NotFoundException('Không tìm thấy phân quyền với ID này');
    }

    await this.rolePermissionModel.findByIdAndUpdate(id, {
      $set: {
        isDeleted: true,
        deletedBy: body.deletedBy,
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa phân quyền thành công' };
  }

  // Thêm method để gán nhiều quyền cho 1 role
  async assignPermissionsToRole(roleId: string, permissionIds: string[]) {
    const rolePermissions: any[] = [];
    
    for (const permissionId of permissionIds) {
      // Kiểm tra xem đã tồn tại chưa
      const existing = await this.rolePermissionModel
        .findOne({ roleId, permissionId, isDeleted: false })
        .lean();
        
      if (!existing) {
        rolePermissions.push({ roleId, permissionId });
      }
    }
    
    if (rolePermissions.length > 0) {
      await this.rolePermissionModel.insertMany(rolePermissions);
    }
    
    return { 
      message: `Đã gán ${rolePermissions.length} quyền mới cho role`,
      assignedCount: rolePermissions.length
    };
  }
}
