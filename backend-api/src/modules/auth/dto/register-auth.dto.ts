import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, MinLength, Matches } from "class-validator";
import { Match } from "src/common/decorators/match.decorator";
import { Gender } from "src/common/types/user/user.type";

export class RegisterAuthDto {
    @ApiProperty({
        example: 'Nguyen Van A',
        description: "Họ và tên người dùng",
    })
    @IsNotEmpty({ message: 'Họ tên không được bỏ trống' })
    @IsString({ message: 'Họ tên phải là chuỗi ký tự' })
    @Length(2, 50, { message: 'Họ tên phải từ 2 đến 50 ký tự' })
    fullName: string;

    @ApiProperty({
        example: 'vannguyen@example.com',
        description: "Email người dùng",
    })
    @IsNotEmpty({ message: 'Email không được bỏ trống' })
    @IsString({ message: 'Email phải là chuỗi ký tự' })
    @IsEmail({}, { message: 'Email không đúng định dạng' })
    email: string;

    @ApiProperty({
        example: 'matkhau12345$',
        description: "Mật khẩu người dùng",
    })
    @IsNotEmpty({ message: 'Mật khẩu không được bỏ trống' })
    @IsString({ message: 'Mật khẩu phải là chuỗi ký tự' })
    @MinLength(6, { message: "Mật khẩu phải tối thiểu 6 ký tự" })
    password: string;


   @ApiProperty({
        example: 'matkhau12345$',
        description: "Xác nhận lại mật khẩu người dùng",
    })
    @IsNotEmpty({ message: "Vui lòng nhập lại mật khẩu" })
    @IsString({ message: 'Xác nhận mật khẩu phải là chuỗi ký tự' })
    @Match('password', { message: 'Mật khẩu xác nhận không khớp' })
    confirmPassword: string;

    @ApiProperty({
        example: "0983838283",
        description: "Số điện thoại người dùng",
        required: false
    })
    @IsOptional()
    @IsString({ message: 'Số điện thoại phải là chuỗi ký tự' })
    @Matches(/^(84|0)(3|5|7|8|9)[0-9]{8}$/, { 
        message: 'Số điện thoại không đúng định dạng Việt Nam' 
    })
    phoneNumber?: string;

    @ApiProperty({
        example: '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM',
        description: 'Địa chỉ giao hàng tại Việt Nam',
        required: false
    })
    @IsOptional()
    @IsString({ message: 'Địa chỉ phải là chuỗi ký tự' })
    @Length(10, 255, { message: 'Địa chỉ phải từ 10 đến 255 ký tự' })
    address?: string;

    @ApiProperty({
        enum: Gender,
        example: Gender.Male,
        description: 'Giới tính người dùng (male/female)',
        required: false
    })
    @IsOptional()
    @IsEnum(Gender, { message: 'Giới tính không hợp lệ' })
    gender?: Gender;
}
