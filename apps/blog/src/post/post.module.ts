import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import {  RoleEnum, ServiceJwt } from '@app/common';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService,PostRepository,ServiceJwt,JwtService],
})
export class PostModule {}
