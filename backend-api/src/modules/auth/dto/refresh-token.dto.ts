import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenAuthDto {
    @IsNotEmpty({ message: 'Access token không được bỏ trống' })
    @IsString({ message: 'Access token phải là chuỗi' })
    accessToken: string;

    @IsNotEmpty({ message: 'Refresh token không được bỏ trống' })
    @IsString({ message: 'Refresh token phải là chuỗi' })
    refreshToken: string;
}
