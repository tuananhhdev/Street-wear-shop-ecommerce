import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo mới danh mục' })
  @ResponseMessage('Tạo mới danh mục thành công')
  create(@Body() body: CreateCategoryDto) {
    return this.categoryService.create(body);
  }
}
