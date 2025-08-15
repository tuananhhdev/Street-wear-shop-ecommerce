import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Áo Thun',
    description: 'Tên danh mục',
    minLength: 2,
    maxLength: 10,
  })
  @IsNotEmpty({ message: 'Tên danh mục không được để trống' })
  @IsString({ message: 'Tên danh mục phải là một chuỗi' })
  @MinLength(1, { message: 'Tên danh mục phải có ít nhất 1 ký tự' })
  @MaxLength(50, { message: 'Tên danh mục không được vượt quá 50 ký tự' })
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiPropertyOptional({
    example: 'Áo thun cotton',
    description: 'Mô tả về danh mục',
  })
  @IsOptional()
  @IsString({ message: 'Mô tả phải là chuỗi ký tự' })
  @MaxLength(500, { message: 'Mô tả không được vượt quá 500 ký tự' })
  @Transform(({ value }) => value?.trim())
  description: string;
}
