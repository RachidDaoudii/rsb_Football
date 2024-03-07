import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryRepository } from './categories.repository';

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [CategoriesService,CategoryRepository],
})
export class CategoriesModule {}
