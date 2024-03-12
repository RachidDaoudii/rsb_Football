import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { log } from 'console';
import { Category ,Staff} from '../entities';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class StaffRepository {
  protected readonly logger = new Logger(StaffRepository.name);
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async create(datauser: any): Promise<Staff[]> {
    try {
      const staff = await this.entityManager.create(Staff, datauser);
      await this.entityManager.save(Staff, staff);
      return await this.entityManager.find(Staff);
    } catch (error) {
      return error.message;
    }
  }

    async findOne(id: number): Promise<Staff> {
        try {
        const staff =  await this.entityManager.findOne(Staff, {
            where: { id: id },
            relations: ['category'],
        });
        

        if (!staff){
            return null;
        }

        return staff;

        } catch (error) {
        throw new ConflictException(error.message);
        }
    }

    async findAll(): Promise<Staff[]> {
        try {
        return await this.entityManager.find(Staff);
        } catch (error) {
        throw new ConflictException(error.message);
        }
    }

    async update(id: number, data: any): Promise<Staff> {
        try {
        const staff = await this.entityManager.update(Staff, id, data);

        if (!staff){
            return null;
        }
        return await this.findOne(id);
        } catch (error) {
        throw new ConflictException(error.message);
        }
    }

    async remove(id: number): Promise<Staff> {
        try {
        const staff = await this.findOne(id);
        if (!staff){
            return null;
        }
        await this.entityManager.delete(Staff, id);
        return staff;
        } catch (error) {
        throw new ConflictException(error.message);
        }
    }

    async findOneCategory(id: number): Promise<Category> {
      try {
      const category =  await this.entityManager.findOne(Category, {
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
