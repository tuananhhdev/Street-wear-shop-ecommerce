import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { swaggerConfig, swaggerOptions } from './common/configs/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ProtectGuard } from './modules/auth/protect/protect.guard';
import { PermissionGuard } from './modules/auth/permissions/permission.guard';

async function bootstrap() {
  const logger = new Logger('Application');
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.useLogger(logger);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:5174', 'http://localhost:5000'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new ProtectGuard(reflector));
  app.useGlobalGuards(new PermissionGuard(reflector));
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));
  app.useGlobalFilters(new GlobalExceptionFilter());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document, swaggerOptions);

  const port = process.env.PORT || 5000;
  await app.listen(port);

  logger.log(`🚀 Application is running on http://localhost:${port}/api`);
  logger.log(`📜 API docs is running on http://localhost:${port}/api-docs`);
}

bootstrap();
