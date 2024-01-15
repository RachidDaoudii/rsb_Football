import { Module } from '@nestjs/common';
import { ClubModule } from '../club/club.module';
import { BlogModule } from '../blog/blog.module';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [ClubModule, BlogModule, CommentModule],
  controllers: [],
  providers: [],
})
export class appModule {}
