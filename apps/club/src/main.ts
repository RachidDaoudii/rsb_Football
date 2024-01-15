import { NestFactory } from '@nestjs/core';
import { appModule } from './appModule/app.module';

async function bootstrap() {
  const app = await NestFactory.create(appModule);
  await app.listen(3000);
}
bootstrap();
