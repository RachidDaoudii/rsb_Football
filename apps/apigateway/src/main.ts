import { NestFactory } from '@nestjs/core';
import { ApigatewayModule } from './apigateway.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(ApigatewayModule);
  const configService = app.get(ConfigService);

  await app.listen(3030);
}
bootstrap();
