import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Streetwear API - Swagger')
    .setDescription('API cho ứng dụng bán quần áo streetwear')
    .setVersion('1.0')
    .addBearerAuth(
        {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'Authorization',
            description: 'Nhập access token vào đây',
            in: 'header',
        },
        'accessToken',
    )
    .build();
