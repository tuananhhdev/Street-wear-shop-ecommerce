import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsOptional, IsBoolean } from 'class-validator';

export class CreateRolePermissionDto {
  @ApiProperty({ 
    example: '507f1f77bcf86cd799439011',
    description: 'ID của role' 
  })
  @IsNotEmpty({ message: 'Role ID không được bỏ trống' })
  @IsMongoId({ message: 'Role ID không đúng định dạng' })
  roleId: string;

  @ApiProperty({ 
    example: '507f1f77bcf86cd799439012',
    description: 'ID của permission' 
  })
  @IsNotEmpty({ message: 'Permission ID không được bỏ trống' })
  @IsMongoId({ message: 'Permission ID không đúng định dạng' })
  permissionId: string;

  @ApiProperty({ 
    example: true,
    description: 'Trạng thái hoạt động',
    default: true,
    required: false
  })
  @IsOptional()
  @IsBoolean({ message: 'Trạng thái phải là true hoặc false' })
  isActive?: boolean;
}
