import { Injectable, Logger } from '@nestjs/common';
import { PrismaServiceAuthentification } from '@app/common/database/authentification';

@Injectable()
export class UserRepository {
  protected readonly logger = new Logger(UserRepository.name);
  constructor(private readonly prismaService: PrismaServiceAuthentification) {}

  async create(datauser: any) {
    try {
      return await this.prismaService.user.create({
        data: {
          ...datauser,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async findUnique(datauser: object | any) {
    try {
      return await this.prismaService.user.findUnique({
        where: datauser,
      });
    } catch (error) {
      return error.message;
    }
  }

  async findMany() {
    try {
      return await this.prismaService.user.findMany();
    } catch (error) {
      return error.message;
    }
  }

  async update(datauser: any, query: any) {
    try {
      return await this.prismaService.user.update({
        where: query,
        data: {
          ...datauser,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  async delete(datauser: any) {
    try {
      return await this.prismaService.user.delete({
        where: datauser,
      });
    } catch (error) {
      return error.message;
    }
  }
}
