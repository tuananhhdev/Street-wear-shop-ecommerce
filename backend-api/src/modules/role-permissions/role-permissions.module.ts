import { Module } from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { RolePermissionsController } from './role-permissions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RolePermission, RolePermissionSchema } from './schema/role-permission.schema';
import { Permission, PermissionSchema } from '../permissions/schema/permission.schema';
import { Role, RoleSchema } from '../role/schema/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RolePermission.name, schema: RolePermissionSchema },
      { name: Permission.name, schema: PermissionSchema }, 
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [RolePermissionsController],
  providers: [RolePermissionsService],
  exports: [RolePermissionsService]
})
export class RolePermissionsModule {}
