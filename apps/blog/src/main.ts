import { NestFactory } from '@nestjs/core';
import { routerModule } from './RouterModule/routerModule.module';
import { LoggerMiddleware } from '@app/common/middleware';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(routerModule);
  const configService = app.get(ConfigService);

  console.log('sending...........');

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RaBbitMQ_URL')],
      queue: 'blog',
    },
  });
  // app.use(new LoggerMiddleware().isAuth);
  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservices();
  await app.listen(4001);
}
bootstrap();
