import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEnum,
  IsEmail,
  MinLength,
  Matches,
} from 'class-validator';
import { Gender } from 'src/common/types/user/user.type';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Nguyen Van A',
    description: 'Họ và tên người dùng',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Họ tên phải là chuỗi ký tự' })
  fullName?: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email người dùng',
    required: false
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email?: string;

  @ApiProperty({
    example: 'newpassword123',
    description: 'Mật khẩu mới',
    minLength: 6,
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Mật khẩu phải là chuỗi ký tự' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password?: string;

  @ApiProperty({
    example: '0123456789',
    description: 'Số điện thoại (định dạng Việt Nam)',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Số điện thoại phải là chuỗi ký tự' })
  @Matches(/^(84|0)(3|5|7|8|9)[0-9]{8}$/, {
    message: 'Số điện thoại không đúng định dạng Việt Nam',
  })
  phoneNumber?: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'URL avatar của người dùng',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Avatar phải là chuỗi ký tự' })
  avatar?: string;

  @ApiProperty({
    example: '123 Nguyen Van Linh, Q7, HCM',
    description: 'Địa chỉ của người dùng',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Địa chỉ phải là chuỗi ký tự' })
  address?: string;

  @ApiProperty({
    example: 'Male',
    description: 'Giới tính',
    enum: Gender,
    required: false
  })
  @IsOptional()
  @IsEnum(Gender, { message: 'Giới tính phải là Male, Female hoặc Other' })
  gender?: Gender;
}
