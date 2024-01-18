import { Module } from '@nestjs/common';
import { ClubModule } from '../club/club.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ClubModule, UserModule],
  controllers: [],
  providers: [],
})
export class appModule {}
