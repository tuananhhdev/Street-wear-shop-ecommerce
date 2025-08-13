import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { PORT } from './common/constant/app.constant';

@Injectable()
export class AppService {
  getWelcome(): {
    message: string;
    details: {
      apiName: string;
      description: string;
      timestamp: string
    };
  } {
    const currentDateTime = format(new Date(), "dd/MM/yyyy HH:mm:ss 'GMT+7'");
    return {
      message: 'Welcome to Streetwear NestJS API',
      details: {
        apiName: 'Streetwear API',
        description: 'API dành cho ứng dụng bán quần áo streetwear - quản lý người dùng, sản phẩm và đơn hàng.',
        timestamp: currentDateTime,
      },
    };
  }
}