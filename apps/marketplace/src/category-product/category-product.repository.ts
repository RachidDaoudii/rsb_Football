import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { log } from 'console';
import { CategoryProduct } from '../entities';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class CategoryProductRepository {
    protected readonly logger = new Logger(CategoryProductRepository.name);
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async create(datauser: any): Promise<CategoryProduct[]> {
    try {
      const categoryProduct = await this.entityManager.save(CategoryProduct, datauser);
      return categoryProduct;
    } catch (error) {
      return error.message;
    }
  }

    async findOne(id: number): Promise<CategoryProduct> {
        try {
        const categoryProduct =  await this.entityManager.findOne(CategoryProduct, {
            where: { id: id },
            relations: ['product'],
        });
        

        if (!categoryProduct){
            return null;
        }

        return categoryProduct;

        } catch (error) {
        throw new ConflictException(error.message);
        }
    }

    async findAll(): Promise<CategoryProduct[]> {
        try {
        return await this.entityManager.find(CategoryProduct);
        } catch (error) {
        throw new ConflictException(error.message);
        }
    }

    async update(id: number, data: any): Promise<CategoryProduct> {
        try {
        const categoryProduct = await this.entityManager.update(CategoryProduct, id, data);

        if (!categoryProduct){
            return null;
        }
        return await this.findOne(id);
        } catch (error) {
        throw new ConflictException(error.message);
        }
    }

    async remove(id: number): Promise<CategoryProduct> {
        try {
        const categoryProduct = await this.findOne(id);
        if (!categoryProduct){
            return null;
        }
        await this.entityManager.delete(CategoryProduct, id);
        return categoryProduct;
        } catch (error) {
        throw new ConflictException(error.message);
        }
    }
}