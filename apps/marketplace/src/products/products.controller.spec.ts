import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto, } from './dto/create-product.dto';
import {  UpdateProductDto } from './dto/update-product.dto';
import { JwtService } from '@nestjs/jwt';
import {  ServiceJwt } from '@app/common';
import { UploadS3Service } from '@app/common/aws/upload-s3/upload-s3.service';
import { ProductRepository } from './products.repository';
import { EntityManager } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Product } from '../entities';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService ,ProductRepository,JwtService,ServiceJwt,UploadS3Service,EntityManager,ConfigService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  describe('create', () => {
    it('should create a new product', () => {
      const createProductDto: CreateProductDto = {
        name: '',
        image: '',
        price: 0,
        stock: 0,
        description: ''
      }; 
      const expectedResult: Product[] = []; []

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      expect(controller.create(createProductDto)).resolves.toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('findAll', () => {
    it('should return all products', () => {
      const expectedResult: Product[] = []; []

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      expect(controller.findAll()).resolves.toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a specific product', () => {
      const id = '1'; 
      const expectedResult: Product = {
        id: 0,
        name: '',
        image: '',
        price: 0,
        stock: 0,
        description: '',
        Category: [],
        orderProducts: [],
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined
      }; 

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      expect(controller.findOne(id)).resolves.toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  
});