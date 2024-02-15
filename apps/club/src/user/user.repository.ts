import { Injectable, Logger } from '@nestjs/common';
import { PrismaServiceClub } from '@app/common/database/club';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaServiceClub) {}
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
