import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../entities';
import { log } from 'console';

@Injectable()
export class UserRepository {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async create(data: any): Promise<User[]> {
    try {
      const user = await this.entityManager.save(User, data);

      return user;
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.entityManager.findOne(User, {
        where: { id: id },
      });

      if (!user) {
        throw new ConflictException('User not found');
      }

      return user;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async find(): Promise<User[]> {
    try {
      return await this.entityManager.find(User);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async update(id: number, data: any) {
    try {
      const updateResult = await this.entityManager.update(
        User,
        { id: id },
        data,
      );
      if (updateResult.affected && updateResult.affected > 0) {
        const updatedUser = await this.entityManager.findOne(User, {
          where: { id: id },
        });
        return updatedUser;
      } else {
        throw new ConflictException('User not found');
      }
    } catch (error) {
      return error.message;
    }
  }

  async delete(id: number) {
    try {
      const deleteResult = await this.entityManager.delete(User, id);

      if (deleteResult.affected && deleteResult.affected > 0) {
        const deleteResult = await this.entityManager.findOne(User, {
          where: { id: id },
        });
        return deleteResult;
      } else {
        throw new ConflictException('User not found');
      }
    } catch (error) {
      return error.message;
    }
  }

  async restore(id: number) {
    try {
      const user = await this.entityManager.restore(User, id);

      return user;
    } catch (error) {
      return error.message;
    }
  }
}
