import { Module } from '@nestjs/common';
import { PrismaServiceBlog } from './prisma.blog.service';

Module({
  providers: [PrismaServiceBlog],
  exports: [PrismaServiceBlog],
});

export class PrismaModuleBlog {}
