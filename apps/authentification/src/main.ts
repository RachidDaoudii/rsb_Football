import { NestFactory } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

//
