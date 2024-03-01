import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractRepository } from '@app/common';
import { Category, Post, User } from '../entities';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService,PostRepository],
})
export class PostModule {}
