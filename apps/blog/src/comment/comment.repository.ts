import { Injectable, Logger } from '@nestjs/common';
import { PrismaServiceBlog } from '@app/common/database/blog';

@Injectable()
export class CommentRepository {
  protected readonly logger = new Logger(CommentRepository.name);

  constructor(private prismaServiceBlog: PrismaServiceBlog) {}

  async create(data: any) {
    try {
      return await this.prismaServiceBlog.comment.create({
        data: {
          ...data,
        },
      });
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async findAll() {
    try {
      return await this.prismaServiceBlog.comment.findMany();
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.prismaServiceBlog.comment.findUnique({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async update(id: string, data: any) {
    try {
      return await this.prismaServiceBlog.comment.update({
        where: { id },
        data: {
          ...data,
        },
      });
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async delete(id: string) {
    try {
      return await this.prismaServiceBlog.comment.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }
}
