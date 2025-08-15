import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsMongoId, IsBoolean } from 'class-validator';

export class UpdateRolePermissionDto {
  @ApiProperty({ 
    example: '507f1f77bcf86cd799439011',
    description: 'ID của role',
    required: false
  })
  @IsOptional()
  @IsMongoId({ message: 'Role ID không đúng định dạng' })
  roleId?: string;

  @ApiProperty({ 
    example: '507f1f77bcf86cd799439012',
    description: 'ID của permission',
    required: false
  })
  @IsOptional()
  @IsMongoId({ message: 'Permission ID không đúng định dạng' })
  permissionId?: string;

  @ApiProperty({ 
    example: false,
    description: 'Trạng thái hoạt động',
    required: false
  })
  @IsOptional()
  @IsBoolean({ message: 'Trạng thái phải là true hoặc false' })
  isActive?: boolean;
}
