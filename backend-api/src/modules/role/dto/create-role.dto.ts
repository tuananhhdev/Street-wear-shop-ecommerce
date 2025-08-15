import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateRoleDto {

    @ApiProperty({ 
        example: 'Manager',
        description: 'Tên vai trò' 
    })
    @IsNotEmpty({ message: 'Tên vai trò không được để trống' })
    @IsString({ message: 'Tên vai trò phải là chuỗi' })
    @Length(3, 50, { message: 'Tên vai trò phải có độ dài từ 3 đến 50 ký tự' })
    name: string;

    @ApiProperty({ 
        example: 'Quản lý hệ thống và người dùng',
        description: 'Mô tả vai trò' 
    })
    @IsNotEmpty({ message: 'Mô tả không được để trống' })
    @IsString({ message: 'Mô tả phải là chuỗi' })
    @Length(10, 200, { message: 'Mô tả phải có độ dài từ 10 đến 200 ký tự' })
    description: string;

    @ApiProperty({ 
        example: true,
        description: 'Trạng thái hoạt động',
        default: true,
        required: false
    })
    @IsOptional()
    @IsBoolean({ message: 'Trạng thái phải là boolean (true hoặc false)' })
    isActive?: boolean = true;
}