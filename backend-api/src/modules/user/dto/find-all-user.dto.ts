import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumberString, IsEnum } from 'class-validator';
import { Gender } from 'src/common/types/user/user.type';

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

    @ApiProperty({})
    @IsOptional()
    @IsString({ message: 'Role phải là chuỗi.' })
    role?: string

    @ApiProperty({ enum: Gender, required: false })
    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender
}
