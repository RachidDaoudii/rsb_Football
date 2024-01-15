import { NestFactory } from '@nestjs/core';
import { AuthentificationModule } from './authentification.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthentificationModule);
  await app.listen(3000);
}
bootstrap();
