import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogRepository } from './blog.repository';
import { PrismaModuleBlog, PrismaServiceBlog } from '@app/common/database/blog';

@Module({
  imports: [PrismaModuleBlog],
  controllers: [BlogController],
  providers: [PrismaServiceBlog, BlogService, BlogRepository],
})
export class BlogModule {}
