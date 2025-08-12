import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator";
import { Gender } from "src/common/types/user/user.type";

export class RegisterAuthDto {
    @ApiProperty({
        example: 'Nguyen Van A',
        description: "Họ và tên người dùng",
    })
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty({
        example: 'vannguyen@example.com',
        description: "Email người dùng",
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'matkhau12345$',
        description: "Mật khẩu người dùng",
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: "Mật khẩu phải tối thiểu 6 ký tự" })
    password: string;

    @ApiProperty({
        example: "0123456789",
        description: "Số điện thoại người dùng",
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    phoneNumber?: string;

    @ApiProperty({
        example: '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM',
        description: 'Địa chỉ giao hàng tại Việt Nam',
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(10, 255)
    address?: string;

    @ApiProperty({
        enum: Gender,
        example: Gender.Male,
        description: 'Giới tính người dùng (male/female)',
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsEnum(Gender)
    gender?: Gender;
}
