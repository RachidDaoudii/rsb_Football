import { NestFactory } from '@nestjs/core';
import { ClubModule } from './club.module';

async function bootstrap() {
  const app = await NestFactory.create(ClubModule);
  await app.listen(3000);
}
bootstrap();
