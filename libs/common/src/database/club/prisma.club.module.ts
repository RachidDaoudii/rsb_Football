import { Module } from '@nestjs/common';
import { PrismaServiceClub } from './prisma.club.service';

Module({
  providers: [PrismaServiceClub],
  exports: [PrismaServiceClub],
});

export class PrismaModuleClub {}
