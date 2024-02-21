import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractEntity } from './abstract.entity';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class AbstractRepository<T extends AbstractEntity<T>> {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly repository: Repository<T>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  async findOne(where: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.repository.findOne({ where });
    if (!entity) {
      throw new NotFoundException('Entity not found');
    }
    return entity;
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ) {
    const entity = await this.repository.update(where, partialEntity);

    if (!entity) {
      this.logger.error('Entity not found with where', where);
      throw new NotFoundException('Entity not found');
    }

    return this.findOne(where);
  }

  async find(where: FindOptionsWhere<T>): Promise<T[]> {
    return this.repository.find({ where });
  }

  async remove(where: FindOptionsWhere<T>): Promise<void> {
    await this.repository.delete(where);
  }
}
