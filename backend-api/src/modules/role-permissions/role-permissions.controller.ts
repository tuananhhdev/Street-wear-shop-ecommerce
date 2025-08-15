import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RolePermissionsService } from './role-permissions.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { FindAllRolePermissionsDto } from './dto/find-all-role-permissions.dto';
import { SoftDeleteDto } from './dto/soft-delete.dto';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { ObjectIdValidationPipe } from '../../common/pipe/object-id.pipe';

@ApiTags('Role Permissions')
@Controller('role-permissions')
export class RolePermissionsController {
  constructor(private readonly rolePermissionsService: RolePermissionsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách phân quyền - dành cho Admin' })
  @ResponseMessage('Lấy danh sách phân quyền thành công')
  findAll(@Query() query: FindAllRolePermissionsDto) {
    return this.rolePermissionsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin phân quyền theo ID - dành cho Admin' })
  @ResponseMessage('Lấy thông tin phân quyền thành công')
  findOne(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.rolePermissionsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo phân quyền mới - dành cho Admin' })
  @ResponseMessage('Tạo phân quyền thành công')
  create(@Body() createRolePermissionDto: CreateRolePermissionDto) {
    return this.rolePermissionsService.create(createRolePermissionDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật phân quyền - dành cho Admin' })
  @ResponseMessage('Cập nhật phân quyền thành công')
  update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateRolePermissionDto: UpdateRolePermissionDto
  ) {
    return this.rolePermissionsService.update(id, updateRolePermissionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa phân quyền (soft delete) - dành cho Admin' })
  @ResponseMessage('Xóa phân quyền thành công')
  remove(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() softDeleteDto: SoftDeleteDto
  ) {
    return this.rolePermissionsService.softDelete(id, softDeleteDto);
  }

  @Post('assign-permissions/:roleId')
  @ApiOperation({ summary: 'Gán nhiều quyền cho một role - dành cho Admin' })
  @ResponseMessage('Gán quyền cho role thành công')
  assignPermissions(
    @Param('roleId', ObjectIdValidationPipe) roleId: string,
    @Body() body: { permissionIds: string[] }
  ) {
    return this.rolePermissionsService.assignPermissionsToRole(roleId, body.permissionIds);
  }
}
