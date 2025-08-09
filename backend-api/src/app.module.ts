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
@Module({
  imports: [MongooseModule.forRoot(DATABASE_URL, {
    serverSelectionTimeoutMS: 10000,
    connectionFactory: (connection) => {
      const logger = new Logger('MongoDB');
      logger.log(chalk.green('✅ MongoDB connected successfully'));
      attachMongoConnectionEvents(connection)
      return connection;
    }
  }), TokenModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, ProtectStrategy],
})
export class AppModule { }
