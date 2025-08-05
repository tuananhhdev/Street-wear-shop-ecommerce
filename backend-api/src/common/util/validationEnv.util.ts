import * as dotenv from 'dotenv-safe';
import { Logger } from '@nestjs/common';

dotenv.config({
  allowEmptyValues: false,
  example: '.env.example',
});

Logger.log('✅ All required environment variables are loaded.', 'ENV');
