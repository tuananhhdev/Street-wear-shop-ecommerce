import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './schema/role.schema';
import { FindAllRolesDto } from './dto/find-all-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { SoftDeleteDto } from './dto/soft-delete.dto';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) { }

    async findAll(query: FindAllRolesDto) {
        const page = Number(query.page) || 1;
        const pageSize = Number(query.pageSize) || 10;
        const skip = (page - 1) * pageSize;

        const filter: any = { isDeleted: false };
        if (query.search) {
            filter.$or = [
                { name: { $regex: query.search, $options: 'i' } },
                { description: { $regex: query.search, $options: 'i' } },
            ];
        }

        const [data, total] = await Promise.all([
            this.roleModel
                .find(filter)
                .skip(skip)
                .limit(pageSize)
                .select('-__v -isDeleted -deletedBy -deletedAt')
                .sort({ createdAt: -1 })
                .lean(),
            this.roleModel.countDocuments(filter),
        ]);

        return ({
            items: data,
            pagination: {
                currentPage: page,
                itemsPerPage: pageSize,
                totalItems: total,
                totalPages: Math.ceil(total / pageSize)
            }
        })
    }

    async findOne(id: string) {
        const role = await this.roleModel
            .findOne({ _id: id, isDeleted: false })
            .select('-__v -isDeleted -deletedBy -deletedAt')
            .lean();
            
        if (!role) {
            throw new NotFoundException(`Không tìm thấy vai trò với ID này`);
        }
        return role;
    }

    async create(body: CreateRoleDto) {
        const { name } = body
        const roleExist = await this.roleModel
            .findOne({ name, isDeleted: false })
            .lean()

        if (roleExist) {
            throw new ConflictException(`Vai trò với tên "${name}" đã tồn tại`);
        }

        const newRole = await this.roleModel.create(body);
        return newRole
    }

    async update(id: string, body: UpdateRoleDto) {
        const roleExists = await this.roleModel
            .findOne({ _id: id, isDeleted: false })
            .lean();
            
        if (!roleExists) {
            throw new NotFoundException('Không tìm thấy vai trò với ID này');
        }

        // Kiểm tra tên trùng (nếu có thay đổi)
        if (body.name && body.name !== roleExists.name) {
            const nameExists = await this.roleModel
                .findOne({ name: body.name, isDeleted: false, _id: { $ne: id } })
                .lean();
                
            if (nameExists) {
                throw new ConflictException(`Vai trò với tên "${body.name}" đã tồn tại`);
            }
        }

        const updatedRole = await this.roleModel
            .findByIdAndUpdate(id, { $set: body }, { new: true })
            .select('-__v -isDeleted -deletedBy -deletedAt')
            .lean();

        return updatedRole;
    }

    async softDelete(id: string, body: SoftDeleteDto) {
        const roleExists = await this.roleModel
            .findOne({ _id: id, isDeleted: false })
            .lean();
            
        if (!roleExists) {
            throw new NotFoundException('Không tìm thấy vai trò với ID này');
        }

        await this.roleModel.findByIdAndUpdate(id, {
            $set: {
                isDeleted: true,
                deletedBy: body.deletedBy,
                deletedAt: new Date(),
            },
        });

        return { message: 'Xóa vai trò thành công' };
    }
}
