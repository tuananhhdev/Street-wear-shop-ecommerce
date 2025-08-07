import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { FindAllUsersDto } from './dto/find-all-user.dto';
import { ObjectIdValidationPipe } from 'src/common/pipe/object-id.pipe';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả người dùng' })
  @ResponseMessage('Lấy tất cả người dùng thành công')
  findAll(
    @Query() query: FindAllUsersDto
  ) {
    return this.userService.findAll(query)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy người dùng theo ID - dành cho Admin' })
  @ResponseMessage('Lấy người dùng theo ID thành công')
  findOne(
    @Param('id', ObjectIdValidationPipe) id: string
  ) {
    return this.userService.findOne(id)
  }
}
