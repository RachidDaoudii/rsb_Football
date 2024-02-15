import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { PrismaServiceBlog } from '@app/common/database/blog';
import { ServiceJwt } from '@app/common/helpers/jwt';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [
    PrismaServiceBlog,
    CategoryService,
    CategoryRepository,
    ServiceJwt,
  ],
})
export class CategoryModule {}
