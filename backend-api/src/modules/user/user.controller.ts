import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { FindAllUsersDto } from './dto/find-all-user.dto';
import { ObjectIdValidationPipe } from 'src/common/pipe/object-id.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions } from 'src/common/configs/upload.config';
import type { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { SkipPermission } from 'src/common/decorators/skip-permission.decorator';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SkipPermission()
  @Get('profile')
  @ApiOperation({ summary: 'Lấy thông tin cá nhân - dành cho Khách hàng' })
  @ResponseMessage('Lấy thông tin cá nhân thành công')
  getProfile(@Req() req: Request) {
    return this.userService.getProfile(req.user);
  }

  @SkipPermission()
  @Patch('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cập nhật thông tin cá nhân - dành cho Khách hàng' })
  @ResponseMessage('Cập nhật thông tin cá nhân thành công')
  updateProfile(@Req() req: Request, @Body() body: UpdateUserDto) {
    return this.userService.updateByCustomer(req.user, body);
  }

  @SkipPermission()
  @Post('avatar')
  @ApiOperation({ summary: 'Upload avatar - dành cho Khách hàng' })
  @ResponseMessage('Upload avatar thành công')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar', imageUploadOptions(5)))
  uploadAvatar(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadAvatarByCustomer(req.user, file);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách người dùng - dành cho Admin' })
  @ResponseMessage('Lấy danh sách người dùng thành công')
  findAll(@Query() query: FindAllUsersDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy thông tin người dùng theo ID - dành cho Admin',
  })
  @ResponseMessage('Lấy thông tin người dùng thành công')
  findOne(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Post(':id/avatar')
  @ApiOperation({ summary: 'Upload avatar cho user - dành cho Admin' })
  @ResponseMessage('Upload avatar thành công')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar', imageUploadOptions(5)))
  uploadAvatarByAdmin(
    @Param('id', ObjectIdValidationPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadAvatarByAdmin(id, file);
  }

  @Patch(':userId/permissions/toggle')
  @ApiOperation({ summary: 'Toggle quyền của user - dành cho Admin' })
  @ResponseMessage('Toggle quyền user thành công')
  toggleUserPermission(
    @Req() req: any,
    @Param('userId', ObjectIdValidationPipe) userId: string,
    @Body() body: { permissionId: string; isActive?: boolean },
  ) {
    return this.userService.toggleUserPermission(
      userId,
      body.permissionId,
      req.user._id,
    );
  }
}
