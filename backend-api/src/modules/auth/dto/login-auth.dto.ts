import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ 
    example: 'user@example.com',
    description: 'Email của người dùng'
  })
  @IsNotEmpty({ message: 'Email không được bỏ trống' })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  @IsString({ message: 'Email phải là chuỗi ký tự' })
  email: string;

  @ApiProperty({ 
    example: 'yourpassword',
    description: 'Mật khẩu của người dùng',
    minLength: 6
  })
  @IsNotEmpty({ message: 'Mật khẩu không được bỏ trống' })
  @IsString({ message: 'Mật khẩu phải là chuỗi ký tự' })
  password: string;
}
