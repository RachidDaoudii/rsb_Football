import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { ServiceJwt } from '@app/common/helpers/jwt';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from '@app/common/interceptors';

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentRepository,

    // ServiceJwt,
    // AuthGuard,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: AuthInterceptor,
    // },
  ],
})
export class CommentModule {}
