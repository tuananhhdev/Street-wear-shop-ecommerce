import { Module, Global, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_URL } from '../constant/app.constant';
import chalk from 'chalk';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const logger = new Logger('Database');
        
        return {
          uri: DATABASE_URL,
          onConnectionCreate: (connection) => {
            connection.on('connected', () => {
              logger.log(chalk.green('✅ MongoDB connected successfully'));
            });

            connection.on('error', (err) => {
              logger.error(chalk.red(`❌ MongoDB error: ${err.message}`));
            });

            connection.on('disconnected', () => {
              logger.warn(chalk.yellow('⚠️ MongoDB disconnected'));
            });

            return connection;
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}