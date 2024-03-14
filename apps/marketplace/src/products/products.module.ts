import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { JwtService } from '@nestjs/jwt';
import {  ServiceJwt } from '@app/common';
import { UploadS3Service } from '@app/common/aws/upload-s3/upload-s3.service';
import { ProductRepository } from './products.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService,JwtService,ServiceJwt,UploadS3Service,ProductRepository],
})
export class ProductsModule {}
