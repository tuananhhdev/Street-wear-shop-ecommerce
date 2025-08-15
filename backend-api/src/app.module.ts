import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TokenModule } from './modules/auth/token/token.module';
import { RolesModule } from './modules/role/role.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolePermissionsModule } from './modules/role-permissions/role-permissions.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    TokenModule,
    RolesModule,
    PermissionsModule,
    RolePermissionsModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

