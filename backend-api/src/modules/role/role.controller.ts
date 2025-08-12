import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RolesService } from './role.service';
import { FindAllRolesDto } from './dto/find-all-role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ObjectIdValidationPipe } from 'src/common/pipe/object-id.pipe';
import { CreateRoleDto } from './dto/create-role.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  @ApiOperation({ summary: 'Tạo vai trò mới - dành cho Admin' })
  @ResponseMessage('Tạo vai trò mới thành công')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

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
    @Param('id', ObjectIdValidationPipe) id: string
  ) {
    return this.rolesService.findOne(id);
  }

}
