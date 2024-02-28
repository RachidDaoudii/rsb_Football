import { NestFactory } from '@nestjs/core';
import { RouterModule } from './Router/routerModule.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(RouterModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RaBbitMQ_URL')],
      queue: 'managementclub',
    },
  });

  await app.startAllMicroservices();
  await app.listen(4002);
}
bootstrap();
