import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './caregory.repository';
import {  ServiceJwt } from '@app/common';
import { JwtService } from '@nestjs/jwt';
import { EntityManager } from 'typeorm';
import { ValidationPipe,INestApplication } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Request } from 'express';
import * as request from 'supertest';
import { AuthGuard } from '@app/common/guards';
import { Response } from 'express';


describe('CategoryController', () => {
  let controller: CategoryController;
  let app: INestApplication;

 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService,CategoryRepository,ServiceJwt,JwtService,EntityManager,
        {
        provide: AuthGuard,
        useValue: {
          canActivate: jest.fn().mockReturnValue(true), // Mock canActivate method to always return true
        },
      },],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    const categoryService = module.get<CategoryService>(CategoryService);

    app = module.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('should return 401 when calling category create without authentication', async () => {
    const createCategoryDto: CreateCategoryDto = { 
      name: 'name'
    };

    const response = await request(app.getHttpServer())
      .post('/api/v1/category')
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
      .patch('/api/v1/category/1')
      .send(updateCategoryDto);

    expect(response.status).toBe(401);
    expect(JSON.stringify(response.body.message)).toBe(
      "\"You are not authentified, please login\""
    );
  });

  it('should create category when admin is authenticated', async () => {
    const createCategoryDto: CreateCategoryDto = {
      name: 'Test Category',
    };

    // Mock the behavior of categoryService.create method
    const createdCategory = {
      id: 1,
      name: 'Test Category',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      posts: []
    };

    jest.spyOn(CategoryService.prototype, 'create').mockResolvedValue([createdCategory]);

    const req = {
      body: createCategoryDto,
    } as unknown as Request;

    const res: Response<any, Record<string, any>> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const { name } = req.body;

    await controller.create({ name }, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Category created',
      data: [createdCategory], 
    });
  });

  it('should update category when admin is authenticated', async () => {
    const updateCategoryDto: UpdateCategoryDto = {
      name: 'Test Category',
    };

    const updatedCategory = {
      id: 1,
      name: 'Test Category',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      posts: []
    };

    jest.spyOn(CategoryService.prototype, 'update').mockResolvedValue(updatedCategory);

    const req = {
      body: updateCategoryDto,
      params: { id: 1 },
    } as unknown as Request;

    const res: Response<any, Record<string, any>> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const { name } = req.body;
    const { id } = req.params;

    await controller.update(id.toString(), { name }, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Category updated',
      data: updatedCategory, 
    });
  });


  it('should return 404 when category is not found', async () => {
    jest.spyOn(CategoryService.prototype, 'findOne').mockResolvedValue(null);

    const req = {
      params: { id: 1 },
    } as unknown as Request;

    const res: Response<any, Record<string, any>> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const { id } = req.params;

    await controller.findOne(id.toString(), res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Category not found',
    });
  });

  it('should return 404 when category is not found', async () => {
    jest.spyOn(CategoryService.prototype, 'remove').mockResolvedValue(null);

    const req = {
      params: { id: 1 },
    } as unknown as Request;

    const res: Response<any, Record<string, any>> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const { id } = req.params;

    await controller.remove(id.toString(), res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Category not found',
    });
  });

});
