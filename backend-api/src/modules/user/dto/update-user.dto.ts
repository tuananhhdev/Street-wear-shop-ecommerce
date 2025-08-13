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
  @IsOptional()
  @IsString({ message: 'Họ tên phải là chuỗi ký tự' })
  fullName?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'Mật khẩu phải là chuỗi ký tự' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password?: string;

  @IsOptional()
  @IsString({ message: 'Số điện thoại phải là chuỗi ký tự' })
  @Matches(/^(84|0)(3|5|7|8|9)[0-9]{8}$/, {
    message: 'Số điện thoại không đúng định dạng Việt Nam',
  })
  phoneNumber?: string;

  @IsOptional()
  @IsString({ message: 'Avatar phải là chuỗi ký tự' })
  avatar?: string;

  @IsOptional()
  @IsString({ message: 'Địa chỉ phải là chuỗi ký tự' })
  address?: string;

  @IsOptional()
  @IsEnum(Gender, { message: 'Giới tính phải là Male, Female hoặc Other' })
  gender?: Gender;
}
