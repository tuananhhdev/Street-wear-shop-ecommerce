import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { FindAllPermissionsDto } from './dto/find-all-permissions.dto';
import { SoftDeleteDto } from './dto/soft-delete.dto';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { ObjectIdValidationPipe } from '../../common/pipe/object-id.pipe';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách quyền - dành cho Admin' })
  @ResponseMessage('Lấy danh sách quyền thành công')
  findAll(@Query() query: FindAllPermissionsDto) {
    return this.permissionsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin quyền theo ID - dành cho Admin' })
  @ResponseMessage('Lấy thông tin quyền thành công')
  findOne(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.permissionsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo quyền mới - dành cho Admin' })
  @ResponseMessage('Tạo quyền thành công')
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật quyền - dành cho Admin' })
  @ResponseMessage('Cập nhật quyền thành công')
  update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updatePermissionDto: UpdatePermissionDto
  ) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa quyền (soft delete) - dành cho Admin' })
  @ResponseMessage('Xóa quyền thành công')
  remove(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() softDeleteDto: SoftDeleteDto
  ) {
    return this.permissionsService.softDelete(id, softDeleteDto);
  }
}
