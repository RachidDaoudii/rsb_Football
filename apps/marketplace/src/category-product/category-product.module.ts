import { Module } from '@nestjs/common';
import { CategoryProductService } from './category-product.service';
import { CategoryProductController } from './category-product.controller';
import { JwtService } from '@nestjs/jwt';
import {  ServiceJwt } from '@app/common';
import { CategoryProductRepository } from './category-product.repository';


@Module({
  controllers: [CategoryProductController],
  providers: [CategoryProductService,CategoryProductRepository,JwtService,ServiceJwt],
})
export class CategoryProductModule {}
