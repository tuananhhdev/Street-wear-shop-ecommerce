import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, IsMongoId, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllRolePermissionsDto {
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
    example: '507f1f77bcf86cd799439011',
    description: 'Lọc theo Role ID',
    required: false
  })
  @IsOptional()
  @IsMongoId({ message: 'Role ID không đúng định dạng' })
  roleId?: string;

  @ApiProperty({ 
    example: '507f1f77bcf86cd799439012',
    description: 'Lọc theo Permission ID',
    required: false
  })
  @IsOptional()
  @IsMongoId({ message: 'Permission ID không đúng định dạng' })
  permissionId?: string;

  @ApiProperty({ 
    example: true,
    description: 'Lọc theo trạng thái hoạt động',
    required: false
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean({ message: 'Trạng thái phải là true hoặc false' })
  isActive?: boolean;
}
