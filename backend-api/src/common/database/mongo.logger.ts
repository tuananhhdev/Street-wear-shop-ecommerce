// src/common/database/mongo.logger.ts
import { Logger } from '@nestjs/common';
import { Connection } from 'mongoose';
import chalk from 'chalk';

const logger = new Logger('MongoDB');

export function attachMongoConnectionEvents(connection: Connection) {
  connection.on('error', (err) => {
    logger.error(chalk.red(`❌ Database connection error: ${err.message}`));
  });

  connection.on('disconnected', () => {
    logger.warn(chalk.yellow('⚠️ Database disconnected'));
  });

  connection.on('reconnected', () => {
    logger.log(chalk.blue('🔄 Database reconnected'));
  });
}
