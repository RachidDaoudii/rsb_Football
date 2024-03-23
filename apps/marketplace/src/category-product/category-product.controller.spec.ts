import { Test, TestingModule } from '@nestjs/testing';
import { CategoryProductController } from './category-product.controller';
import { CategoryProductService } from './category-product.service';
import { CategoryProduct } from '../entities';
import { JwtService } from '@nestjs/jwt';
import {  ServiceJwt } from '@app/common';
import { CategoryProductRepository } from './category-product.repository';
import { EntityManager } from 'typeorm';

describe('CategoryProductController', () => {
  let controller: CategoryProductController;
  let service: CategoryProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryProductController],
      providers: [CategoryProductService, CategoryProductRepository, JwtService, ServiceJwt,EntityManager],
    }).compile();

    controller = module.get<CategoryProductController>(CategoryProductController);
    service = module.get<CategoryProductService>(CategoryProductService);
  });

  describe('create', () => {
    it('should create a new category product', () => {
      const createCategoryProductDto = {
        name: 'Category 1',
      }; // Provide the necessary input data
      const expectedResult: CategoryProduct[] = []; // Provide the expected result with the correct type

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      expect(controller.create(createCategoryProductDto)).resolves.toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createCategoryProductDto);
    });
  });

  describe('findAll', () => {
    it('should return all category products', () => {
      const expectedResult: CategoryProduct[] = []; // Provide the expected result with the correct type

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      expect(controller.findAll()).resolves.toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a specific category product', () => {
      const id = '1'; // Provide the necessary input data
      const expectedResult: CategoryProduct = {
        id: 0,
        name: '',
        product: [],
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined
      }; // Provide the expected result with the correct type

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      expect(controller.findOne(id)).resolves.toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should update a specific category product', () => {
      const id = '1'; // Provide the necessary input data
      const updateCategoryProductDto = {}; // Provide the necessary input data
      const expectedResult: CategoryProduct = {
        id: 0,
        name: '',
        product: [],
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined
      }; // Provide the expected result with the correct type

      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

      expect(controller.update(id, updateCategoryProductDto)).resolves.toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(+id, updateCategoryProductDto);
    });
  });

  describe('remove', () => {
    it('should remove a specific category product', () => {
      const id = '1'; // Provide the necessary input data
      const expectedResult: CategoryProduct = {
        id: 0,
        name: '',
        product: [],
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined
      }; // Provide the expected result with the correct type

      jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

      expect(controller.remove(id)).resolves.toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});