import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModuleClub, PrismaServiceClub } from '@app/common/database/club';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [PrismaModuleClub],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaServiceClub, CategoryRepository],
})
export class CategoryModule {}
