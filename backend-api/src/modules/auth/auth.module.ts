import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schema/user.schema';
import { TokenModule } from './token/token.module';
import { JwtService } from '@nestjs/jwt';
import { RoleSchema } from '../role/schema/role.schema';
import { RolePermissionSchema } from '../role-permissions/schema/role-permission.schema';
import { ProtectStrategy } from './protect/protect.strategy';
import { PermissionStrategy } from './permissions/permission.strategy';
import { PermissionSchema } from '../permissions/schema/permission.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'Role', schema: RoleSchema },
    { name: 'RolePermission', schema: RolePermissionSchema },
    { name: 'Permission', schema: PermissionSchema } 
  ]), TokenModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, ProtectStrategy, PermissionStrategy],
})

export class AuthModule {}
