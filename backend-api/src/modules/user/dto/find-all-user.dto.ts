import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class FindAllUsersDto {
    @ApiProperty({
        example: 'John',
        description: 'Tìm kiếm theo tên, email hoặc số điện thoại',
        required: false
    })
    @IsOptional()
    @IsString({ message: 'Search phải là chuỗi.' })
    search?: string;

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
}
