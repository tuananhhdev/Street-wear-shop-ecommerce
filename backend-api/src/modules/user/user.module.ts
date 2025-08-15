import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { RolePermissionSchema } from '../role-permissions/schema/role-permission.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'RolePermission', schema: RolePermissionSchema }
  ])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, MongooseModule]
})
export class UserModule { }
