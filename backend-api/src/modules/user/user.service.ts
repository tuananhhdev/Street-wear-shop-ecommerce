import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './schema/user.schema';
import { FindAllUsersDto } from './dto/find-all-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) { }

    async findAll(query: FindAllUsersDto) {
        const page = Number(query.page) || 1;
        const pageSize = Number(query.pageSize) || 10;
        const skip = (page - 1) * pageSize;

        const filter: any = { isDeleted: false };
        if (query.search) {
            filter.$or = [
                { name: { $regex: query.search, $options: 'i' } },
                { email: { $regex: query.search, $options: 'i' } },
            ];
        }

        const [data, total] = await Promise.all([
            this.userModel.find(filter).skip(skip).limit(pageSize).select('-password -__v').lean(),
            this.userModel.countDocuments(filter),
        ]);

        return {
            items: data,
            pagination: {
                currentPage: page,
                itemsPerPage: pageSize,
                totalPages: Math.ceil(total / pageSize),
                totalItems: total,
            }
        }

    }

   
}
