import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { log } from 'console';
import { CategoryProduct,Product} from '../entities';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class ProductRepository {
  protected readonly logger = new Logger(ProductRepository.name);
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async create(datauser: any): Promise<Product[]> {
    try {
      const product = await this.entityManager.create(Product, datauser);
      await this.entityManager.save(Product, product);
      return await this.entityManager.find(Product);
    } catch (error) {
      return error.message;
    }
  }

    async findOne(id: number): Promise<Product> {
        try {
        const product =  await this.entityManager.findOne(Product, {
            where: { id: id },
            relations: ['Category'],
        });
        

        if (!product){
            return null;
        }

        return product;

        } catch (error) {
        throw new ConflictException(error.message);
        }
    }

    async findAll(): Promise<Product[]> {
        try {
        return await this.entityManager.find(Product,{relations: ['Category']});
        } catch (error) {
        throw new ConflictException(error.message);
        }
    }

    async update(id: number, data: any): Promise<Product> {
        try {
        const product = await this.entityManager.update(Product, id, data);

        if (!product){
            return null;
        }
        return await this.findOne(id);
        } catch (error) {
        throw new ConflictException(error.message);
        }
    }

    async remove(id: number): Promise<Product> {
        try {
        const product = await this.findOne(id);
        if (!product){
            return null;
        }
        await this.entityManager.delete(Product, id);
        return product;
        } catch (error) {
        throw new ConflictException(error.message);
        }
    }

    async findOneCategory(id: number): Promise<CategoryProduct> {
      try {
      const category =  await this.entityManager.findOne(CategoryProduct, {
          where: { id: id },
      });
      

      if (!category){
          return null;
      }

      return category;

      } catch (error) {
      throw new ConflictException(error.message);
      }
  }
}
