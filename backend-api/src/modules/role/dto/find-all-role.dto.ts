import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class FindAllRolesDto {
    @ApiProperty({
        example: '1',
        description: 'Số trang',
        required: false
    })
    @IsOptional()
    @IsNumberString({}, { message: 'Page phải là số.' })
    page?: string;

    @ApiProperty({
        example: '10',
        description: 'Số lượng item trên mỗi trang',
        required: false
    })
    @IsOptional()
    @IsNumberString({}, { message: 'Limit phải là số.' })
    pageSize?: string;

    @ApiProperty({
        example: 'admin',
        description: 'Tìm kiếm theo tên role',
        required: false
    })
    @IsOptional()
    @IsString({ message: 'Search phải là chuỗi.' })
    search?: string;
}
