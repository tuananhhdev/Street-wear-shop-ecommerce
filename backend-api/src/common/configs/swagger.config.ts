import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Streetwear API - Fashion E-commerce')
  .setDescription('API cho ứng dụng thời trang bán quần áo Streetwear')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'JWT access token (Format: Bearer <token>)',
      in: 'header',
    },
    'accessToken',
  )
  .addServer('http://localhost:5000', 'Local Dev Server')
  .addServer(
    'https://street-wear-shop-ecommerce-yrjl.onrender.com',
    'Production Server',
  )
  .build();

export const swaggerOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    tagsSorter: 'alpha',
    operationsSorter: 'alpha',
    docExpansion: 'none',
    defaultModelsExpandDepth: 1,
    defaultModelExpandDepth: 1,
    displayRequestDuration: true,
    filter: true,
    tryItOutEnabled: true,
  },
  customSiteTitle: 'Streetwear API Documentation',
};
