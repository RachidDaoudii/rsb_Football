import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/common';

@Injectable()
export class PlayerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(player: any) {
    try {
      return await this.prismaService.player.create({
        data: {
          ...player,
        },
      });
    } catch (error) {
      console.log(error);

      return error.message;
    }
  }

  async getAll() {
    try {
      return await this.prismaService.player.findMany({});
    } catch (error) {
      return error.message;
    }
  }

  async getOne(id: string) {
    try {
      return await this.prismaService.player.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async update(id: string, player: any) {
    try {
      return await this.prismaService.player.update({
        where: {
          id,
        },
        data: {
          ...player,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async delete(id: string) {
    try {
      return await this.prismaService.player.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async get(include: object) {
    try {
      const res = await this.prismaService.player.findMany({
        include: {
          ...include,
        },
      });

      return res;
    } catch (error) {
      return {
        error: 'An error occurred while fetching player data.',
      };
    }
  }
}
