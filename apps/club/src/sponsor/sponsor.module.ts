import { Module } from '@nestjs/common';
import { SponsorService } from './sponsor.service';
import { SponsorController } from './sponsor.controller';
import { PrismaModuleClub, PrismaServiceClub } from '@app/common';
import { SponsorRepository } from './sponsor.repository';

@Module({
  imports: [PrismaModuleClub],
  controllers: [SponsorController],
  providers: [SponsorService, SponsorRepository, PrismaServiceClub],
})
export class SponsorModule {}
