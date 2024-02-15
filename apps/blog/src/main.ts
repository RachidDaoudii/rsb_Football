import { NestFactory } from '@nestjs/core';
import { routerModule } from './RouterModule/routerModule.module';
import { LoggerMiddleware } from '@app/common/middleware';

async function bootstrap() {
  const app = await NestFactory.create(routerModule);
  // app.use(new LoggerMiddleware().isAuth);

  await app.listen(3001);
}
bootstrap();
