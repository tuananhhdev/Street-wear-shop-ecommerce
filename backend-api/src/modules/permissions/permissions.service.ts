import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from './schema/permission.schema';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { FindAllPermissionsDto } from './dto/find-all-permissions.dto';
import { SoftDeleteDto } from './dto/soft-delete.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>
  ) {}

  async findAll(query: FindAllPermissionsDto) {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const filter: any = { isDeleted: false };
    
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { key: { $regex: query.search, $options: 'i' } },
        { endpoint: { $regex: query.search, $options: 'i' } },
      ];
    }

    if (query.module) {
      filter.module = { $regex: query.module, $options: 'i' };
    }

    const [data, total] = await Promise.all([
      this.permissionModel
        .find(filter)
        .skip(skip)
        .limit(pageSize)
        .select('-__v -isDeleted -deletedBy -deletedAt')
        .sort({ createdAt: -1 })
        .lean(),
      this.permissionModel.countDocuments(filter),
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
    const permission = await this.permissionModel
      .findOne({ _id: id, isDeleted: false })
      .select('-__v -isDeleted -deletedBy -deletedAt')
      .lean();
      
    if (!permission) {
      throw new NotFoundException('Không tìm thấy quyền với ID này');
    }
    
    return permission;
  }

  async create(body: CreatePermissionDto) {
    const { key, endpoint, method } = body;
    
    // Kiểm tra key đã tồn tại
    const keyExists = await this.permissionModel
      .findOne({ key, isDeleted: false })
      .lean();
      
    if (keyExists) {
      throw new ConflictException(`Quyền với key "${key}" đã tồn tại`);
    }

    // Kiểm tra endpoint + method đã tồn tại
    const endpointExists = await this.permissionModel
      .findOne({ endpoint, method, isDeleted: false })
      .lean();
      
    if (endpointExists) {
      throw new ConflictException(`Quyền với endpoint "${endpoint}" và method "${method}" đã tồn tại`);
    }

    const newPermission = await this.permissionModel.create(body);
    return newPermission;
  }

  async update(id: string, body: UpdatePermissionDto) {
    const permissionExists = await this.permissionModel
      .findOne({ _id: id, isDeleted: false })
      .lean();
      
    if (!permissionExists) {
      throw new NotFoundException('Không tìm thấy quyền với ID này');
    }

    // Kiểm tra key trùng (nếu có thay đổi)
    if (body.key && body.key !== permissionExists.key) {
      const keyExists = await this.permissionModel
        .findOne({ key: body.key, isDeleted: false, _id: { $ne: id } })
        .lean();
        
      if (keyExists) {
        throw new ConflictException(`Quyền với key "${body.key}" đã tồn tại`);
      }
    }

    // Kiểm tra endpoint + method trùng (nếu có thay đổi)
    if ((body.endpoint || body.method) && 
        (body.endpoint !== permissionExists.endpoint || body.method !== permissionExists.method)) {
      const endpoint = body.endpoint || permissionExists.endpoint;
      const method = body.method || permissionExists.method;
      
      const endpointExists = await this.permissionModel
        .findOne({ endpoint, method, isDeleted: false, _id: { $ne: id } })
        .lean();
        
      if (endpointExists) {
        throw new ConflictException(`Quyền với endpoint "${endpoint}" và method "${method}" đã tồn tại`);
      }
    }

    const updatedPermission = await this.permissionModel
      .findByIdAndUpdate(id, { $set: body }, { new: true })
      .select('-__v -isDeleted -deletedBy -deletedAt')
      .lean();

    return updatedPermission;
  }

  async softDelete(id: string, body: SoftDeleteDto) {
    const permissionExists = await this.permissionModel
      .findOne({ _id: id, isDeleted: false })
      .lean();
      
    if (!permissionExists) {
      throw new NotFoundException('Không tìm thấy quyền với ID này');
    }

    await this.permissionModel.findByIdAndUpdate(id, {
      $set: {
        isDeleted: true,
        deletedBy: body.deletedBy,
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa quyền thành công' };
  }
}
