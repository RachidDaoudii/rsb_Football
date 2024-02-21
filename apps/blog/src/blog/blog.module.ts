import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogRepository } from './blog.repository';
import { ServiceJwt } from '@app/common/helpers/jwt';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository],
})
export class BlogModule {}
