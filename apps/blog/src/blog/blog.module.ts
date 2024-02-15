import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogRepository } from './blog.repository';
import { PrismaServiceBlog } from '@app/common/database/blog';
import { ServiceJwt } from '@app/common/helpers/jwt';

@Module({
  imports: [],
  controllers: [BlogController],
  providers: [PrismaServiceBlog, BlogService, BlogRepository, ServiceJwt],
})
export class BlogModule {}
