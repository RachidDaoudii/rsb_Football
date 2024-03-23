import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { log } from 'console';
import { Player ,Category} from '../entities';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class PlayerRepository {
  protected readonly logger = new Logger(PlayerRepository.name);
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async create(datauser: any): Promise<Player[]> {
    try {
      const player = await this.entityManager.create(Player, datauser);
      await this.entityManager.save(Player, player);
      return await this.entityManager.find(Player);
    } catch (error) {
      return error.message;
    }
  }

    async findOne(id: number): Promise<Player> {
        try {
        const player =  await this.entityManager.findOne(Player, {
            where: { id: id },
            relations: ['category'],
        });
        

        if (!player){
            return null;
        }

        return player;

        } catch (error) {
        throw new ConflictException(error.message);
        }
    }

    async findAll(): Promise<Player[]> {
        try {
        return await this.entityManager.find(Player,{
            relations: ['category'],
        });
        } catch (error) {
        throw new ConflictException(error.message);
        }
    }

    async update(id: number, data: any): Promise<Player> {
        try {
        const player = await this.entityManager.update(Player, id, data);

        if (!player){
            return null;
        }
        return await this.findOne(id);
        } catch (error) {
        throw new ConflictException(error.message);
        }
    }

    async remove(id: number): Promise<Player> {
        try {
        const player = await this.findOne(id);
        if (!player){
            return null;
        }
        await this.entityManager.delete(Player, id);
        return player;
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
