import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { log } from 'console';
import { Category } from '../entities';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class CategoryRepository {
  protected readonly logger = new Logger(CategoryRepository.name);
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async create(datauser: any): Promise<Category[]> {
    try {
      const category = await this.entityManager.save(Category, datauser);
      return category;
    } catch (error) {
      return error.message;
    }
  }

    async findOne(id: number): Promise<Category> {
        try {
        const category =  await this.entityManager.findOne(Category, {
            where: { id: id },
            relations: ['player'],
        });
        

        if (!category){
            return null;
        }

        return category;

        } catch (error) {
        throw new ConflictException(error.message);
        }
    }

    async findAll(): Promise<Category[]> {
        try {
        return await this.entityManager.find(Category);
        } catch (error) {
        throw new ConflictException(error.message);
        }
    }

    async update(id: number, data: any): Promise<Category> {
        try {
        const category = await this.entityManager.update(Category, id, data);

        if (!category){
            return null;
        }
        return await this.findOne(id);
        } catch (error) {
        throw new ConflictException(error.message);
        }
    }

    async remove(id: number): Promise<Category> {
        try {
        const category = await this.findOne(id);
        if (!category){
            return null;
        }
        await this.entityManager.delete(Category, id);
        return category;
        } catch (error) {
        throw new ConflictException(error.message);
        }
    }


}
