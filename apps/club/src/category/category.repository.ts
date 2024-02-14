import { Injectable, Logger } from '@nestjs/common';
import { PrismaServiceClub } from '@app/common';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prismaService: PrismaServiceClub) {}

  async create(category: any) {
    try {
      return await this.prismaService.categoryPlayer.create({
        data: {
          ...category,
        },
      });
    } catch (error) {
      console.log(error);

      return error.message;
    }
  }

  async getAll() {
    try {
      return await this.prismaService.categoryPlayer.findMany();
    } catch (error) {
      return error.message;
    }
  }

  async getOne(id: string) {
    try {
      return await this.prismaService.categoryPlayer.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async update(id: string, category: any) {
    try {
      return await this.prismaService.categoryPlayer.update({
        where: {
          id,
        },
        data: {
          ...category,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async delete(id: string) {
    try {
      return await this.prismaService.categoryPlayer.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      return error.message;
    }
  }
}
