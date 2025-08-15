import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { HttpMethod } from './create-permission.dto';

export class UpdatePermissionDto {
  @ApiProperty({ 
    example: 'USER_UPDATE',
    description: 'Key duy nhất của quyền',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Key phải là chuỗi ký tự' })
  key?: string;

  @ApiProperty({ 
    example: 'Cập nhật người dùng',
    description: 'Tên hiển thị của quyền',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Tên quyền phải là chuỗi ký tự' })
  name?: string;

  @ApiProperty({ 
    example: '/api/users/:id',
    description: 'Endpoint API',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Endpoint phải là chuỗi ký tự' })
  endpoint?: string;

  @ApiProperty({ 
    example: 'PUT',
    enum: HttpMethod,
    description: 'HTTP Method',
    required: false
  })
  @IsOptional()
  @IsEnum(HttpMethod, { message: 'Method phải là GET, POST, PUT, PATCH hoặc DELETE' })
  method?: HttpMethod;

  @ApiProperty({ 
    example: 'User Management',
    description: 'Module/nhóm chức năng',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Module phải là chuỗi ký tự' })
  module?: string;
}
