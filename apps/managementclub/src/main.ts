import { NestFactory } from '@nestjs/core';
import { RouterModule } from './Router/routerModule.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(RouterModule);
  const configService = app.get(ConfigService);
  // app.use(new LoggerMiddleware().isAuth);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RaBbitMQ_URL')],
      queue: 'managementclub',
    },
  });
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.startAllMicroservices();
  await app.listen(4002);
}
bootstrap();
