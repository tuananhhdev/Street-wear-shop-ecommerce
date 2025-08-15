import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenAuthDto {
    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'Access token cần refresh'
    })
    @IsNotEmpty({ message: 'Access token không được bỏ trống' })
    @IsString({ message: 'Access token phải là chuỗi' })
    accessToken: string;

    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'Refresh token để lấy access token mới'
    })
    @IsNotEmpty({ message: 'Refresh token không được bỏ trống' })
    @IsString({ message: 'Refresh token phải là chuỗi' })
    refreshToken: string;
}
