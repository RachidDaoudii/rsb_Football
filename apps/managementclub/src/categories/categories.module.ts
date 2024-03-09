import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryRepository } from './categories.repository';
import { UploadS3Service } from '@app/common/aws/upload-s3/upload-s3.service';
import { JwtService } from '@nestjs/jwt';
import {  ServiceJwt } from '@app/common';

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [CategoriesService,CategoryRepository,UploadS3Service,JwtService,ServiceJwt],
})
export class CategoriesModule {}
