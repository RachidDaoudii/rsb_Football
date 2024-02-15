import { Injectable, Logger } from '@nestjs/common';
import { PrismaServiceBlog } from '@app/common/database/blog';

@Injectable()
export class BlogRepository {
  protected readonly logger = new Logger(BlogRepository.name);
  constructor(private prismaServiceBlog: PrismaServiceBlog) {}

  async create(data: any) {
    try {
      return await this.prismaServiceBlog.post.create({
        data: {
          title: data.title,
          content: data.content,
          image: data.image,
          authorId: data.authorId,
          categories: {
            create: data.categories.map((categoryId: string) => ({
              assignedBy: 'Bob',
              assignedAt: new Date(),
              categoryId: categoryId,
            })),
          },
        },
      });
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async findAll() {
    try {
      return await this.prismaServiceBlog.post.findMany({
        where: {
          isdeleted: false,
        },
      });
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.prismaServiceBlog.post.findUnique({
        where: {
          id: id,
          isdeleted: false,
        },
      });
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async update(id: string, data: any) {
    try {
      return await this.prismaServiceBlog.post.update({
        where: {
          id: id,
          // isdeleted: false
        },
        data: {
          title: data.title,
          content: data.content,
          image: data.image,
          authorId: data.authorId,
          categories: {
            deleteMany: {},
            create: data.categories.map((categoryId: string) => ({
              assignedBy: 'Bob',
              assignedAt: new Date(),
              categoryId: categoryId,
            })),
          },
        },
        include: {
          categories: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaServiceBlog.post.update({
        where: { id: id },
        data: {
          isdeleted: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  async findAllPostWithCategory() {
    try {
      return await this.prismaServiceBlog.post.findMany({
        include: {
          categories: {
            select: {
              category: true,
              assignedBy: true,
              assignedAt: true,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }
}
