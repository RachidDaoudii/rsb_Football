import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { log } from 'console';
import { User } from '../entities';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserRepository {
  protected readonly logger = new Logger(UserRepository.name);
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async create(datauser: any): Promise<User[]> {
    try {
      const user = await this.entityManager.save(User, datauser);

      return user;
    } catch (error) {
      return error.message;
    }
  }

  async findOne(email: string): Promise<User> {
    try {
      return await this.entityManager.findOne(User, {
        where: { email: email },
      });
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
