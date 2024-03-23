import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { CategoryRepository } from './categories.repository';
import { UploadS3Service } from '@app/common/aws/upload-s3/upload-s3.service';
import { JwtService } from '@nestjs/jwt';
import {  ServiceJwt } from '@app/common';
import { EntityManager } from 'typeorm';
import { ValidationPipe,INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService , CategoryRepository, UploadS3Service, JwtService, ServiceJwt, EntityManager,ConfigService],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
