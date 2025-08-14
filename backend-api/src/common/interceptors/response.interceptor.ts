import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const startTime = Date.now();

    return next.handle().pipe(
      map((data) => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        const statusCode = response.statusCode;
        const message =
          this.reflector.get<string>(
            RESPONSE_MESSAGE_KEY,
            context.getHandler(),
          ) || 'Success';

        const baseUrl = `${request.protocol}://${request.get('host')}`;
        const controllerName = context.getClass().name;
        const methodName = context.getHandler().name;

        const apiTags = this.reflector.get(
          'swagger/apiUseTags',
          context.getClass(),
        );
        const tag = apiTags?.[0] || controllerName.replace('Controller', '');

        const docsUrl = `${baseUrl}/api-docs#/${tag}/${controllerName}_${methodName}`;

        const userInfo = request.user
          ? `User: ${request.user._id}`
          : 'Anonymous';
        const logMessage = `[${request.method}] ${request.url} | Status: ${statusCode} | ${userInfo} | ${responseTime}ms | ${message}`;

        if (statusCode >= 200 && statusCode < 300) {
          this.logger.log(`✅ ${logMessage}`);
        } else if (statusCode >= 400) {
          this.logger.warn(`⚠️ ${logMessage}`);
        } else {
          this.logger.log(logMessage);
        }

        return {
          status: 'success',
          statusCode,
          message,
          data,
          docs: docsUrl,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
