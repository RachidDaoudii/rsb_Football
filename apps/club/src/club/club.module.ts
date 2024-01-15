import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { DatabaseModule } from '@app/common';
import { ClubRepository } from './club.repository';
import { ClubDocument, ClubSchema } from './models/club.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ClubDocument.name, schema: ClubSchema },
    ]),
  ],
  controllers: [ClubController],
  providers: [ClubService, ClubRepository],
})
export class ClubModule {}
