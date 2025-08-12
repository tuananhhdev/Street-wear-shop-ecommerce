import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RolePermission, RolePermissionDocument } from 'src/modules/role-permissions/schema/role-permission.schema';

@Injectable()
export class PermissionStrategy extends PassportStrategy(Strategy, 'permission') {
  constructor(
    @InjectModel(RolePermission.name) private readonly rolePermissionModel: Model<RolePermissionDocument>,
  ) {
    super();
  }

  async validate(req: any) {
    const user = req.user;
    const roleId = user.roleId;

    if (user.role?.name === 'Admin') {
      return true;
    }

    const endpoint = req?._parsedUrl?.pathname;
    const method = req?.method;

    const isPermission = await this.rolePermissionModel
      .findOne({
        roleId: roleId,
        isActive: true,
      })
      .populate({
        path: 'permissionId',
        match: { endpoint, method },
        select: 'endpoint method'
      })
      .populate({
        path: 'roleId',
        match: { isActive: true },
        select: 'name'
      })
      .lean();


    if (!isPermission || !isPermission.permissionId) {
      throw new BadRequestException(`Không có quyền truy cập với endpoint này`);
    }

    return true;
  }
}
