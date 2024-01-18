import { NestFactory } from '@nestjs/core';
import { routerModule } from './RouterModule/routerModule.module';

async function bootstrap() {
  const app = await NestFactory.create(routerModule);
  await app.listen(3001);
}
bootstrap();
