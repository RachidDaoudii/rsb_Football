import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { PostRepository } from '../post/post.repository';

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [CommentService,CommentRepository,PostRepository],
})
export class CommentModule {}
