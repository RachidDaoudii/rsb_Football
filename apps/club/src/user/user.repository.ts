import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(user: any) {
    try {
      return await this.prismaService.user.create({
        data: {
          ...user,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async getAll() {
    try {
      return await this.prismaService.user.findMany();
    } catch (error) {
      return error.message;
    }
  }
}
