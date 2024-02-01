import { Module } from '@nestjs/common';
import { SponsorService } from './sponsor.service';
import { SponsorController } from './sponsor.controller';
import { PrismaModule, PrismaService } from '@app/common';
import { SponsorRepository } from './sponsor.repository';

@Module({
  imports: [PrismaModule],
  controllers: [SponsorController],
  providers: [SponsorService, SponsorRepository, PrismaService],
})
export class SponsorModule {}
