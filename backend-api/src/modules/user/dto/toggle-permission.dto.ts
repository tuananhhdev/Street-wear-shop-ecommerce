import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class TogglePermissionDto {
    @ApiProperty({
        example: '507f1f77bcf86cd799439011',
        description: 'ID của permission cần toggle'
    })
    @IsNotEmpty({ message: 'Permission ID không được bỏ trống' })
    @IsMongoId({ message: 'Permission ID không đúng định dạng' })
    permissionId: string;
}
