import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class FindAllUsersDto {
    @IsOptional()
    @IsString({ message: 'Search phải là chuỗi.' })
    search?: string;

    @IsOptional()
    @IsNumberString({}, { message: 'Page phải là số.' })
    page?: string;

    @IsOptional()
    @IsNumberString({}, { message: 'Limit phải là số.' })
    pageSize?: string;
}
