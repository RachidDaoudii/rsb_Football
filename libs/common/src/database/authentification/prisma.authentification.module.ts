import { Module } from '@nestjs/common';
import { PrismaServiceAuthentification } from './prisma.authentification.service';

Module({
  providers: [PrismaServiceAuthentification],
  exports: [PrismaServiceAuthentification],
});

export class PrismaModuleAuthentification {}
