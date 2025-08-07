import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenAuthDto {
    @IsNotEmpty({ message: 'Access token không được bỏ trống' })
    @IsString()
    accessToken: string;

    @IsNotEmpty({ message: 'Refresh token không được bỏ trống' })
    @IsString()
    refreshToken: string;
}
