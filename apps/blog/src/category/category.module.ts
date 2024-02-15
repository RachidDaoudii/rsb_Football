import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { PrismaModuleBlog ,PrismaServiceBlog } from '@app/common/database/blog';

@Module({
  imports: [PrismaModuleBlog],
  controllers: [CategoryController],
  providers: [PrismaServiceBlog, CategoryService, CategoryRepository],
})
export class CategoryModule {}
