import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './schema/role.schema';
import { FindAllRolesDto } from './dto/find-all-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) { }

    async findAll(query: FindAllRolesDto) {
        const page = Number(query.page) || 1;
        const pageSize = Number(query.pageSize) || 10;
        const skip = (page - 1) * pageSize;

        const filter: any = {};
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
        const role = await this.roleModel.findById(id).select('-__v -isDeleted -deletedBy -deletedAt').lean();
        if (!role) {
            throw new NotFoundException(`Không tìm thấy vai trò với ID này`);
        }
        return role;
    }

    async create(body: CreateRoleDto) {
        const { name } = body
        const roleExist = await this.roleModel.findOne({ name }).lean()

        if (roleExist) {
            throw new ConflictException(`Vai trò với tên "${name}" đã tồn tại`);
        }

        const newRole = await this.roleModel.create(body);

        return newRole
    }


}
