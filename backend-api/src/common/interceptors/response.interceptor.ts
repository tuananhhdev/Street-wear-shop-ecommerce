import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const res = context.switchToHttp().getResponse();
        const req = context.switchToHttp().getRequest();

        const statusCode = res.statusCode;

        const baseUrl = `${req.protocol}://${req.get('host')}/api-docs`;
        const methodName = context.getHandler().name;
        const controllerName = context.getClass().name;
        const tag = controllerName.replace('Controller', '');
        const docUrl = `${baseUrl}#/${tag}/${methodName}`;

        const message =
            this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getHandler()) ??
            'Success';

        return next.handle().pipe(
            map((data) => ({
                status: 'success',
                statusCode,
                message,
                data,
                docs: docUrl,
                timestamp: new Date().toISOString(),
            })),
        );
    }
}
