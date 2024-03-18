import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import {
  AUTH_SERVICE,
  blogService,
  MANAGEMENTCLUB,
  MARKETPLACE,
} from '@app/common/constant';
import { UserRepository } from './user.repository';
import { bcryptService } from '@app/common/helpers/bcrypt';
import { EntityManager } from 'typeorm';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,UserRepository,bcryptService,EntityManager,
      {
        provide: blogService,
        useValue: {
          send: jest.fn(),
        },
      },
      {
        provide: MANAGEMENTCLUB,
        useValue: {
          send: jest.fn(),
        },
      },
      {
        provide: MARKETPLACE,
        useValue: {
          send: jest.fn(),
        },
      },
      {
        provide: 'UserRepository',
        useValue: {
          create: jest.fn(),
          findOne: jest.fn(),
        },
      },
      {
        provide: 'bcryptService',
        useValue: {
          hash: jest.fn(),
        },
      }
      ],

    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
