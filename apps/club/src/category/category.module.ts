import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule, PrismaService } from '@app/common';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, CategoryRepository],
})
export class CategoryModule {}
