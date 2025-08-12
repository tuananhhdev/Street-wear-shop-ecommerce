import { IsBoolean, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateRoleDto {

    @IsNotEmpty({ message: 'Tên vai trò không được để trống' })
    @IsString({ message: 'Tên vai trò phải là chuỗi' })
    @Length(3, 50, { message: 'Tên vai trò phải có độ dài từ 3 đến 50 ký tự' })
    name: string;

    @IsNotEmpty({ message: 'Mô tả không được để trống' })
    @IsString({ message: 'Mô tả phải là chuỗi' })
    @Length(10, 200, { message: 'Mô tả phải có độ dài từ 10 đến 200 ký tự' })
    description: string;

    @IsNotEmpty({ message: 'Trạng thái không được để trống' })
    @IsBoolean({ message: 'Trạng thái phải là boolean (true hoặc false' })
    isActive: boolean = true;
}