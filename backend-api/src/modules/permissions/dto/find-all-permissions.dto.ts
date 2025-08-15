import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllPermissionsDto {
  @ApiProperty({ 
    example: 1,
    description: 'Số trang',
    required: false,
    default: 1
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Số trang phải là số' })
  @Min(1, { message: 'Số trang phải lớn hơn 0' })
  page?: number;

  @ApiProperty({ 
    example: 10,
    description: 'Số lượng item mỗi trang',
    required: false,
    default: 10
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Kích thước trang phải là số' })
  @Min(1, { message: 'Kích thước trang phải lớn hơn 0' })
  pageSize?: number;

  @ApiProperty({ 
    example: 'user',
    description: 'Tìm kiếm theo tên hoặc key',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Từ khóa tìm kiếm phải là chuỗi ký tự' })
  search?: string;

  @ApiProperty({ 
    example: 'User Management',
    description: 'Lọc theo module',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Module phải là chuỗi ký tự' })
  module?: string;
}
