import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryRepository } from './caregory.repository';
import { EntityManager } from 'typeorm';
import {  ServiceJwt } from '@app/common';
import { JwtService } from '@nestjs/jwt';
describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService,CategoryRepository,ServiceJwt,JwtService,EntityManager],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
