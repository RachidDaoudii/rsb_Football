import { Module } from '@nestjs/common';
import { BlogModule } from '../blog/blog.module';
import { CommentModule } from '../comment/comment.module';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';
import { PrismaModuleBlog } from '@app/common/database/blog';
import { JwtModule } from '@app/common/helpers/jwt';

@Module({
  imports: [
    PrismaModuleBlog,
    JwtModule,
    BlogModule,
    CommentModule,
    CategoryModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class routerModule {}
