import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_URL } from './common/constant/app.constant';
import chalk from "chalk"
import { attachMongoConnectionEvents } from './common/database/mongo.logger';
import { UserModule } from './modules/user/user.module';
import { TokenModule } from './modules/auth/token/token.module';
import { ProtectStrategy } from './modules/auth/protect/protect.strategy';
import { RolesModule } from './modules/role/role.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolePermissionsModule } from './modules/role-permissions/role-permissions.module';
import { PermissionStrategy } from './modules/auth/permissions/permission.strategy';
import { RolePermission, RolePermissionSchema } from './modules/role-permissions/schema/role-permission.schema';
@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_URL, { /* ... */ }),
    MongooseModule.forFeature([
      { name: RolePermission.name, schema: RolePermissionSchema },
    ]),
    TokenModule,
    AuthModule,
    UserModule,
    RolesModule,
    PermissionsModule,
    RolePermissionsModule
  ],
  controllers: [AppController],
  providers: [AppService, ProtectStrategy, PermissionStrategy],
})
export class AppModule {}

