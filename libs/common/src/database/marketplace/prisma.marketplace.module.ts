import { Module } from '@nestjs/common';
import { PrismaServiceMarketplace } from './prisma.marketplace.service';

Module({
  providers: [PrismaServiceMarketplace],
  exports: [PrismaServiceMarketplace],
});

export class PrismaModuleMarketplace {}
