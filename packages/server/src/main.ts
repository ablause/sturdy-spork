import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  await app.listen(port);
  Logger.log(`🚀 Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
