import { Test, TestingModule } from '@nestjs/testing';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';

describe('ClubController', () => {
  let clubController: ClubController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClubController],
      providers: [ClubService],
    }).compile();

    clubController = app.get<ClubController>(ClubController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(clubController.getHello()).toBe('Hello World!');
    });
  });
});
