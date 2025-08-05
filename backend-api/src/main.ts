import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { PORT } from './common/constant/app.constant';
import { SwaggerModule } from "@nestjs/swagger"
import './common/util/validationEnv.util';
import { swaggerConfig } from './common/configs/swagger.config';

async function bootstrap() {
  const logger = new Logger('Bootstrap')
  const app = await NestFactory.create(AppModule);

  app.enableCors()
  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: { persistAuthorization: true }
  });

  await app.listen(PORT ?? 5000);
  logger.log(`Application is running on port http://localhost:${PORT}/api`)
}
bootstrap();
