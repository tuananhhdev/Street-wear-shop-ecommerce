import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

export const winstonConfig: winston.LoggerOptions = {
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp({ format: 'HH:mm:ss' }),
                winston.format.colorize(),
                winston.format.printf(({ level, message, timestamp }) => {
                    return `[${timestamp}] ${level} ${message}`;
                }),
            ),
        }),
    ],
};
