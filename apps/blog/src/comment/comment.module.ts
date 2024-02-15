import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { PrismaServiceBlog } from '@app/common/database/blog';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { ServiceJwt } from '@app/common/helpers/jwt';

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentRepository,
    PrismaServiceBlog,
    ServiceJwt,
    AuthGuard,
  ],
})
export class CommentModule {}
