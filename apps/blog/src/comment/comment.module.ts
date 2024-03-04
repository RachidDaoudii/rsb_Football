import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { PostRepository } from '../post/post.repository';
import {  ServiceJwt } from '@app/common';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [],
  controllers: [CommentController],
  providers: [CommentService,CommentRepository,PostRepository,ServiceJwt,JwtService],
})
export class CommentModule {}
