import { Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { FindAllUsersDto } from './dto/find-all-user.dto';
import { ObjectIdValidationPipe } from 'src/common/pipe/object-id.pipe';
import { FileInterceptor } from "@nestjs/platform-express"
import { imageUploadOptions } from 'src/common/configs/upload.config';
import { PermissionKey } from 'src/common/enums/permission-key.enum';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // dành cho Admin
  @Get()
  @ApiOperation({ summary: 'Lấy tất cả người dùng' })
  @ResponseMessage('Lấy tất cả người dùng thành công')
  findAll(
    @Query() query: FindAllUsersDto
  ) {
    return this.userService.findAll(query)
  }

  // dành cho Admin
  @Get(':id')
  @ApiOperation({ summary: 'Lấy người dùng theo ID - dành cho Admin' })
  @ResponseMessage('Lấy người dùng theo ID thành công')
  findOne(
    @Param('id', ObjectIdValidationPipe) id: string
  ) {
    return this.userService.findOne(id)
  }

  // dành cho Admin
  @Post('upload-avatar/:id')
  @ApiOperation({ summary: 'Tải lên avatar người dùng - dành cho Admin' })
  @ResponseMessage('Tải lên avatar người dùng thành công')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar', imageUploadOptions(5)))
  uploadAvatarByAdmin(
    @Param("id", ObjectIdValidationPipe) id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.userService.uploadAvatarByAdmin(id, file)
  }
}
