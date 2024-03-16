import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpStatus} from '@nestjs/common';
import { Response } from 'express';
import { UserRepository } from './user.repository';
import { bcryptService } from '@app/common/helpers/bcrypt';
import { EntityManager } from 'typeorm';
import { blogService,MANAGEMENTCLUB ,MARKETPLACE} from '@app/common/constant';
import { ServiceJwt } from '@app/common';
import { JwtModule,JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [UserController],
      providers: [UserService,UserRepository,bcryptService,EntityManager,ServiceJwt,JwtService,
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
        }
        ,{
          provide: MARKETPLACE,
          useValue: {
            send: jest.fn(),
          },
        }
      ]
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);;
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;

  describe('create', () => {
    it('should return status 201 and "User created" message when user is successfully created', async () => {
      const createUserDto: CreateUserDto = {
        firstName:"test",
        lastName:"test",
        email:"test@gmail.com",
        password:"test123456"
       };


      jest.spyOn(userService, 'create').mockResolvedValueOnce(createUserDto);
      const pp = await userController.create(createUserDto, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User created' });
    });

    it('should return status 404 and "User not found" message when user creation fails', async () => {
      const createUserDto: CreateUserDto = {  
      firstName:"",
      lastName:"",
      email:"",
      password:""};

      jest.spyOn(userService, 'create').mockResolvedValueOnce(null);

      await userController.create(createUserDto, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found' });
    });


  });
  
});
