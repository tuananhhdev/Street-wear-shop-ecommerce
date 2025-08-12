import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RolesService } from './role.service';
import { FindAllRolesDto } from './dto/find-all-role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả vai trò - dành cho Admin' })
  @ResponseMessage('Lấy tất cả vai trò thành công')
  findAll(
    @Query() query: FindAllRolesDto
  ) {
    return this.rolesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin vai trò theo ID - dành cho Admin' })
  @ResponseMessage('Lấy thông tin vai trò theo ID thành công')
  findOne(
    @Param('id') id: string
  ) {
    return this.rolesService.findOne(id);
  }
}
