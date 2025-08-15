import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schema/category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(body: CreateCategoryDto) {
    const catExist = await this.categoryModel.findOne({
      name: body.name,
      isDeleted: false,
    });

    if (catExist) {
      throw new BadRequestException(
        'Danh mục đã tồn tại, vui lòng tạo danh mục mới',
      );
    }

    const newCat = await this.categoryModel
      .create(body)
      .then((doc) =>
        this.categoryModel
          .findById(doc._id)
          .select('-__v -isDeleted -deletedBy -deletedAt')
          .exec(),
      );

    return newCat;
  }
}
