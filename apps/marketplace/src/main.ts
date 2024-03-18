import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config'
import { RouterModule } from './Router/routerModule.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(RouterModule);
  const configService = app.get(ConfigService);
  // app.use(new LoggerMiddleware().isAuth);
  console.log('sending marketplace...........');
  // app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [configService.getOrThrow('RaBbitMQ_URL')],
  //     queue: 'marketplace',
  //   },
  // });
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  // await app.startAllMicroservices();
  await app.listen(4003);
}
bootstrap();
