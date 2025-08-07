import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {
    @IsNotEmpty({ message: 'Email không được bỏ trống' })
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty({ message: 'Mật khẩu không được bỏ trống' })
    @IsString()
    password: string
}