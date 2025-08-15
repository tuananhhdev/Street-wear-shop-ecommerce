import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({ 
    example: 'Manager',
    description: 'Tên vai trò',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Tên vai trò phải là chuỗi ký tự' })
  name?: string;

  @ApiProperty({ 
    example: 'Quản lý hệ thống',
    description: 'Mô tả vai trò',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Mô tả phải là chuỗi ký tự' })
  description?: string;

  @ApiProperty({ 
    example: true,
    description: 'Trạng thái hoạt động',
    required: false
  })
  @IsOptional()
  @IsBoolean({ message: 'Trạng thái phải là true hoặc false' })
  isActive?: boolean;
}
