import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RolePermission, RolePermissionDocument } from 'src/modules/role-permissions/schema/role-permission.schema';

@Injectable()
export class PermissionStrategy extends PassportStrategy(Strategy, 'permission') {
  constructor(
    @InjectModel('RolePermission') private readonly rolePermissionModel: Model<RolePermissionDocument>,
  ) {
    super();
  }

  async validate(req: any) {
    console.log('PermissionStrategy :: validate');
    const user = req.user;
    const roleId = user.roleId;

    if (user.role?.name === 'Admin') {
       return true;
    }

    const endpoint = req?._parsedUrl?.pathname;
    const method = req?.method;
    console.log({ endpoint, method, roleId });

    const isPermission = await this.rolePermissionModel
      .findOne({
        roleId: roleId,
        isActive: true,
      })
     
      .populate({
        path: 'permissionId',
        match: { endpoint: endpoint, method: method },
      })
      .exec();

    if (!isPermission || !isPermission.permissionId || !isPermission.roleId) {
       throw new BadRequestException('Không có quyền truy cập với endpoint này');
    }


    return user;
  }
}