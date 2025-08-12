import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus ? exception.getStatus() : 500;

        this.logger.error(`[${request.method}] ${request.url} - Error: ${exception.message}`);

        response.status(status).json({
            statusCode: status,
            message: exception.message || 'Internal Server Error',
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }
}