import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { BlogModule } from '../blog/blog.module';
import { TagModule } from '../tag/tag.module';
import { CommentModule } from '../comment/comment.module';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [BlogModule, TagModule, CommentModule, CategoryModule, UserModule],
  controllers: [],
  providers: [],
})
export class routerModule {}
