import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryRepository } from './categories.repository';
import { UploadS3Service } from '@app/common/aws/upload-s3/upload-s3.service';
import { JwtService } from '@nestjs/jwt';
import {  ServiceJwt } from '@app/common';
import { EntityManager } from 'typeorm';
import { ValidationPipe,INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Request } from 'express';
import * as request from 'supertest';
import { Category } from '../entities';
import { Response } from 'express';
import { log } from 'console';


describe('CategoriesController', () => {
  let controller: CategoriesController;
  let app: INestApplication;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      
      controllers: [CategoriesController],
      providers: [CategoriesService , CategoryRepository, UploadS3Service, JwtService, ServiceJwt, EntityManager , ConfigService],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);

    app = module.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  
  it('should return 401 when calling category create without authentication', async () => {
    const createCategoryDto: CreateCategoryDto = { 
      name: 'name',
      image: 'image'
    };

    const response = await request(app.getHttpServer())
      .post('/api/v1/categories')
      .send(createCategoryDto);

    expect(response.status).toBe(401);
    expect(JSON.stringify(response.body.message)).toBe(
      "\"You are not authentified, please login\""
    );
  });

  it('should return 401 when calling category update without authentication', async () => {
    const updateCategoryDto: UpdateCategoryDto = { 
      name: 'name'
    };

    const response = await request(app.getHttpServer())
      .patch('/api/v1/categories/1')
      .send(updateCategoryDto);

    expect(response.status).toBe(401);
    expect(JSON.stringify(response.body.message)).toBe(
      "\"You are not authentified, please login\""
    );
  });

  // it('should create category when admin is authenticated', async () => {


  //   const createdCategory: Category = {
  //     id: 1,
  //     name: 'Test Category',
  //     image: 'image',
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     deletedAt: null,
  //     player: null,
  //     staff: null,
  //   };

  //   const res: Response<any, Record<string, any>> = {
  //     status: jest.fn().mockReturnThis(),
  //     json: jest.fn().mockReturnThis(),
  //   } as unknown as Response<any, Record<string, any>>;

  //   await controller.create({ name: 'Test Category', image: 'image' },res);

  //   expect(res.status).toHaveBeenCalledWith(201);
  //   expect(res.json).toEqual({
  //     message: 'Category created',
  //     data: createdCategory, 
  //   });
  // });

  it('should update category when admin is authenticated', async () => {
    const updateCategoryDto: UpdateCategoryDto = {
      name: 'Test Category',
    };

    const updatedCategory = {
      id: 1,
      name: 'Test Category',
      image: 'image',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      staff: [],
      player: []
    };

    jest.spyOn(CategoriesService.prototype, 'update').mockResolvedValue({
      ...updatedCategory
    });

    const req = {
      body: updateCategoryDto,
      params: { id: 1 },
    } as unknown as Request;

    const res: Response<any> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response<any>;

    const { name } = req.body;
    const { id } = req.params;

    await controller.update(id.toString(), { name },res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Category updated',
      data: updatedCategory, 
    });
  });


  it('should return 200 when category is not found', async () => {
    jest.spyOn(CategoriesService.prototype, 'findOne').mockResolvedValue(null);

    const req = {
      params: { id: 1 },
    } as unknown as Request;

    const res: Response<any, Record<string, any>> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const { id } = req.params;

    await controller.findOne(id.toString(), res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Category found',
      data: null,
    });
  });

  it('should return Category deleted when category is deleted', async () => {
    jest.spyOn(CategoriesService.prototype, 'remove').mockResolvedValue(null);

    const req = {
      params: { id: 1 },
    } as unknown as Request;

    const res: Response<any, Record<string, any>> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const { id } = req.params;

    await controller.remove(id.toString(), res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Category deleted',
      data:null
    });
  });

});
