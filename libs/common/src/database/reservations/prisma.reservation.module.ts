import { Module } from '@nestjs/common';
import { PrismaServiceReservation } from './prisma.reservation.service';

Module({
  providers: [PrismaServiceReservation],
  exports: [PrismaServiceReservation],
});

export class PrismaModuleReservation {}
