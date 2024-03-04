import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './caregory.repository';
import {  ServiceJwt } from '@app/common';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CategoryService,CategoryRepository,
    ServiceJwt,JwtService],
})
export class CategoryModule {}
