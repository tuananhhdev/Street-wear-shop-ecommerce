import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsBoolean, IsOptional } from 'class-validator';

export class ToggleUserPermissionDto {
  @ApiProperty({ 
    example: '507f1f77bcf86cd799439011',
    description: 'ID của người dùng' 
  })
  @IsNotEmpty({ message: 'User ID không được bỏ trống' })
  @IsMongoId({ message: 'User ID không đúng định dạng' })
  userId: string;

  @ApiProperty({ 
    example: '507f1f77bcf86cd799439012',
    description: 'ID của permission' 
  })
  @IsNotEmpty({ message: 'Permission ID không được bỏ trống' })
  @IsMongoId({ message: 'Permission ID không đúng định dạng' })
  permissionId: string;

  @ApiProperty({ 
    example: true,
    description: 'Trạng thái quyền (true: bật, false: tắt)',
    required: false
  })
  @IsOptional()
  @IsBoolean({ message: 'Trạng thái phải là true hoặc false' })
  isActive?: boolean;
}

export class BulkToggleUserPermissionDto {
  @ApiProperty({ 
    example: '507f1f77bcf86cd799439011',
    description: 'ID của người dùng' 
  })
  @IsNotEmpty({ message: 'User ID không được bỏ trống' })
  @IsMongoId({ message: 'User ID không đúng định dạng' })
  userId: string;

  @ApiProperty({ 
    example: ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013'],
    description: 'Danh sách Permission IDs',
    type: [String]
  })
  @IsNotEmpty({ message: 'Permission IDs không được bỏ trống' })
  permissionIds: string[];

  @ApiProperty({ 
    example: false,
    description: 'Trạng thái quyền cho tất cả permissions (true: bật, false: tắt)'
  })
  @IsNotEmpty({ message: 'Trạng thái không được bỏ trống' })
  @IsBoolean({ message: 'Trạng thái phải là true hoặc false' })
  isActive: boolean;
}
