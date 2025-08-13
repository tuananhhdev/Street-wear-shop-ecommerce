import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './schema/user.schema';
import { FindAllUsersDto } from './dto/find-all-user.dto';
import cloudinary from 'src/common/configs/cloundinary.config';
import sharp from 'sharp';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from 'src/common/types/user/user.type';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(query: FindAllUsersDto) {
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const filter: any = { isDeleted: false };
    if (query.search) {
      filter.$or = [
        { fullName: { $regex: query.search, $options: 'i' } },
        { email: { $regex: query.search, $options: 'i' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.userModel
        .find(filter)
        .skip(skip)
        .limit(pageSize)
        .populate('roleId', '-__v')
        .select('-password -__v -isDeleted -deletedBy -deletedAt')
        .lean(),
      this.userModel.countDocuments(filter),
    ]);

    return {
      items: data,
      pagination: {
        currentPage: page,
        itemsPerPage: pageSize,
        totalPages: Math.ceil(total / pageSize),
        totalItems: total,
      },
    };
  }

  async findOne(id: string) {
    const userExist = await this.userModel
      .findOne({ _id: id, isDeleted: false })
      .select('-password -__v -isDeleted -deletedBy -deletedAt ')
      .lean();
    if (!userExist)
      throw new NotFoundException('Người dùng không tồn tại hoặc đã bị xóa');

    return userExist;
  }

  async uploadAvatarByAdmin(id: string, file: Express.Multer.File) {
    const userExist = await this.userModel.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!userExist)
      throw new NotFoundException('Người dùng không tồn tại hoặc đã bị xóa');
    if (!file) throw new NotFoundException('Không có file tải lên');

    if (userExist.avatar) {
      await cloudinary.uploader.destroy(userExist.avatar);
    }

    const processedBuffer = await sharp(file.buffer)
      .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
      .toFormat('jpeg', { quality: 80 })
      .toBuffer();

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'avatars',
            context: { alt: `Avatar của ${userExist.fullName}` },
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        )
        .end(processedBuffer);
    });

    userExist.avatar = uploadResult.public_id;
    await userExist.save();

    return {
      userId: userExist._id,
      avatar: {
        publicId: uploadResult.public_id,
        url: uploadResult.secure_url,
        thumbnailUrl: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/c_thumb,w_150,h_150/${uploadResult.public_id}`,
        originalUrl: uploadResult.secure_url,
      },
    };
  }

  async 

  async updateByCustomer(user: IUser, body: UpdateUserDto) {
    const userExist = await this.userModel.findOne({
      _id: user._id,
      isDeleted: false,
    });
    if (!userExist)
      throw new NotFoundException('Người dùng không tồn tại hoặc đã bị xóa');

    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    if (body.email && body.email !== userExist.email) {
      const emailExists = await this.userModel.findOne({
        email: body.email,
        isDeleted: false,
        _id: { $ne: user._id },
      });
      if (emailExists) throw new BadRequestException('Email đã được sử dụng');
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(user._id, { $set: body }, { new: true })
      .select('-password -__v -isDeleted -deletedBy -deletedAt')
      .lean();
      
    return updatedUser;
  }
}
