import { Test, TestingModule } from '@nestjs/testing';
import { UploadS3Controller } from './upload-s3.controller';

describe('UploadS3Controller', () => {
  let controller: UploadS3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadS3Controller],
    }).compile();

    controller = module.get<UploadS3Controller>(UploadS3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
