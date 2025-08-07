import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshTokenAuthDto } from './dto/refresh-token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản' })
  @ResponseMessage('Đăng ký tài khoản thành công')
  register(
    @Body() dto: RegisterAuthDto
  ) {
    return this.authService.register(dto)
  }

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập tài khoản' })
  @ResponseMessage('Đăng nhập tài khoản thành công')
  login(
    @Body() dto: LoginAuthDto
  ) {
    return this.authService.login(dto)
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Làm mói token khi access token hết hạn' })
  @ResponseMessage('Làm mới token thành công')
  refreshToken(
    @Body() dto: RefreshTokenAuthDto
  ) {
    return this.authService.refreshToken(dto)
  }
}
