import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_URL } from './common/constant/app.constant';
import chalk from "chalk"
import { attachMongoConnectionEvents } from './common/database/mongo.logger';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [MongooseModule.forRoot(DATABASE_URL, {
    serverSelectionTimeoutMS: 10000,
    connectionFactory: (connection) => {
      const logger = new Logger('MongoDB');
      logger.log(chalk.green('✅ MongoDB connected successfully'));
      attachMongoConnectionEvents(connection)
      return connection;
    }
  }), AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
