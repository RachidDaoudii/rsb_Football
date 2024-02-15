import { Injectable, Logger } from '@nestjs/common';
import { PrismaServiceBlog } from '@app/common/database/blog';

@Injectable()
export class CategoryRepository {
  protected readonly logger = new Logger(CategoryRepository.name);

  constructor(private prismaServiceBlog: PrismaServiceBlog) {}

  async create(data: any) {
    try {
      return await this.prismaServiceBlog.category.create({ data });
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async findAll() {
    try {
      return await this.prismaServiceBlog.category.findMany();
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.prismaServiceBlog.category.findUnique({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async update(id: string, data: any) {
    try {
      return await this.prismaServiceBlog.category.update({
        where: { id },
        data,
      });
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaServiceBlog.category.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }
}
