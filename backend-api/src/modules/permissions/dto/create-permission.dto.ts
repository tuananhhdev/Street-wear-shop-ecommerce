import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export class CreatePermissionDto {
  @ApiProperty({ 
    example: 'USER_CREATE',
    description: 'Key duy nhất của quyền' 
  })
  @IsNotEmpty({ message: 'Key không được bỏ trống' })
  @IsString({ message: 'Key phải là chuỗi ký tự' })
  key: string;

  @ApiProperty({ 
    example: 'Tạo người dùng',
    description: 'Tên hiển thị của quyền' 
  })
  @IsNotEmpty({ message: 'Tên quyền không được bỏ trống' })
  @IsString({ message: 'Tên quyền phải là chuỗi ký tự' })
  name: string;

  @ApiProperty({ 
    example: '/api/users',
    description: 'Endpoint API' 
  })
  @IsNotEmpty({ message: 'Endpoint không được bỏ trống' })
  @IsString({ message: 'Endpoint phải là chuỗi ký tự' })
  endpoint: string;

  @ApiProperty({ 
    example: 'POST',
    enum: HttpMethod,
    description: 'HTTP Method' 
  })
  @IsNotEmpty({ message: 'Method không được bỏ trống' })
  @IsEnum(HttpMethod, { message: 'Method phải là GET, POST, PUT, PATCH hoặc DELETE' })
  method: HttpMethod;

  @ApiProperty({ 
    example: 'User Management',
    description: 'Module/nhóm chức năng' 
  })
  @IsNotEmpty({ message: 'Module không được bỏ trống' })
  @IsString({ message: 'Module phải là chuỗi ký tự' })
  module: string;
}
