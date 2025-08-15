import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class SoftDeleteDto {
  @ApiProperty({ 
    example: '507f1f77bcf86cd799439011',
    description: 'ID của người thực hiện xóa' 
  })
  @IsNotEmpty({ message: 'ID người xóa không được bỏ trống' })
  @IsMongoId({ message: 'ID người xóa không đúng định dạng' })
  deletedBy: string;
}
