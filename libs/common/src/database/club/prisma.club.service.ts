import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaServiceClub extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}