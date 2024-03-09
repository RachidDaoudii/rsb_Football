import { Module } from '@nestjs/common';
import { UploadS3Service } from './upload-s3.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),],
  controllers: [],
  providers: [UploadS3Service]
})
export class UploadS3Module {}
