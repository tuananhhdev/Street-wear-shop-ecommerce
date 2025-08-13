import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : 500;

    const requestId = request.headers['x-request-id'] || null;

    let message = 'Internal Server Error';
    let errors: string[] | null = null;

    /** --- Logging nội bộ --- **/
    const logPayload: Record<string, any> = {
      method: request.method,
      url: request.url,
      status,
      requestId,
    };

    if (exception instanceof BadRequestException) {
      const res = exception.getResponse() as any;
      const messages = Array.isArray(res.message) ? res.message : [res.message];

      logPayload.type = 'ValidationError';
      logPayload.errors = messages;

      this.logger.error(JSON.stringify(logPayload));

      message = 'Validation failed';
      errors = messages;
    } else if (exception instanceof HttpException) {
      const res = exception.getResponse() as any;
      message = typeof res === 'string' ? res : res.message || message;

      logPayload.type = 'HttpException';
      logPayload.message = message;

      this.logger.error(JSON.stringify(logPayload));
    } else {
      message = (exception as any)?.message || message;

      logPayload.type = 'UnhandledException';
      logPayload.message = message;
      logPayload.stack = (exception as any)?.stack;

      this.logger.error(JSON.stringify(logPayload));
    }

    /** --- Response cho FE --- **/
    const errorResponse: Record<string, any> = {
      status: 'error',
      statusCode: status,
      message,
    };

    if (errors) {
      errorResponse.errors = errors;
    }

    errorResponse.path = request.url;
    errorResponse.method = request.method;
    errorResponse.timestamp = new Date().toISOString();

    response.status(status).json(errorResponse);
  }
}
