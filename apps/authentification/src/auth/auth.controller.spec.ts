import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { bcryptService } from '@app/common/helpers/bcrypt';
import { EntityManager } from 'typeorm';
import { blogService ,MANAGEMENTCLUB , MARKETPLACE} from '@app/common/constant';
import { UserRepository } from '../user/user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ServiceJwt } from '@app/common';
import { log } from 'console';
import { ValidationPipe,INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { LocalAuthGuard } from './guards';
import { Request } from 'express';
describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;

  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [AuthController],
      providers: [AuthService, UserService,ServiceJwt,bcryptService,UserRepository,EntityManager,JwtService,
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
      
      ],
    })
    .compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);

    app = module.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  // describe('login', () => {
  //   it('should return status 401 and "Unauthorized" message when login fails', async () => {
  //     const response = await request(app.getHttpServer())
  //       .post('/api/auth/login')
  //       .send({
  //           email: 'test@example.com',
  //           password: 'testPassword',
  //       });

  //     expect(response.status).toBe(401);
  //     expect(response.body.message).toBe('Unauthorized');


  //   //   const req = { 
  //   //   body:{
  //   //     email:"",
  //   //     password:""
  //   //   },
  //   //   user:{
  //   //     accessToken: "",
  //   //     refreshToken: "",
  //   //     id: 1,
  //   //     firstName: "",
  //   //     lastName: "",
  //   //     email: "",
  //   //     password: "",
  //   //     roles: [],
  //   //     phone: "",
  //   //     avatar: "",
  //   //     address: "",
  //   //     emailVerified: false,
  //   //     isBlocked: false,
  //   //     isDeleted: false,
  //   //     emailVerificationToken: "",
  //   //     updatedAt: new Date(),
  //   //     passwordResetToken: "",
  //   //     passwordResetTokenExpires: new Date(),
  //   //     emailVerifiedAt: new Date(),
  //   //     createdAt: new Date(),
  //   //   }
  //   // } ;
  //   //   const res = {
  //   //     status: jest.fn().mockReturnThis(),
  //   //     json: jest.fn().mockReturnThis(),
  //   //   } as unknown as Response;

  //   //   jest.spyOn(authService, 'login').mockResolvedValueOnce(req.user);

  //   //   await authController.login(req, res);

  //   //   expect(res.status).toHaveBeenCalledWith(401);
  //   //   expect(res.json).toHaveBeenCalledWith({
  //   //     message: 'Unauthorized',
  //   //   });

  //   },10000);

  //   // it('should return status 200 and user data when login is successful', async () => {
  //   //   const req = { user: {  } };
  //   //   const res = {
  //   //     cookie: jest.fn().mockReturnThis(),
  //   //     json: jest.fn().mockReturnThis(),
  //   //   } as unknown as Response;

  //   //   jest.spyOn(authService, 'login').mockResolvedValueOnce(null);

  //   //   await authController.login(req, res);

  //   //   expect(res.cookie).toHaveBeenCalledTimes(2);
  //   //   expect(res.json).toHaveBeenCalledWith({
  //   //     message: 'User logged in successfully',
  //   //     user: req.user,
  //   //   });
  //   // });
  // });

  describe('registerUser', () => {
    it('should call userService.create with the provided createUserDto', async () => {
      const createUserDto: CreateUserDto = { firstName:"",
      lastName:"",
      email:"",
      password:"" };

      const response = await request(app.getHttpServer())
      .post('/api/auth/register')
      .send(createUserDto);

    expect(response.status).toBe(400);
    expect(JSON.stringify(response.body.message)).toBe(
      JSON.stringify([
        "firstName should not be empty",
        "lastName should not be empty",
        "email should not be empty",
        "password should not be empty"
      ])
    );
    
    });
  });

  describe('refreshToken', () => {
    it('should call authService.refreshToken with the provided user', async () => {
      const req = {
      id:1,
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      roles:[]} as unknown as Request;

      jest.spyOn(authService, 'refreshToken').mockResolvedValueOnce({
        accessToken: '',
      });

      await authController.refrshToken(req);

      expect(authService.refreshToken).toHaveBeenCalledWith(req.user);
    });
  });

  describe('logout', () => {
    it('should clear the access token and refresh token cookies', async () => {
      const res = {
        clearCookie: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await authController.logout(res);

      expect(res.clearCookie).toHaveBeenCalledTimes(2);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User logged out successfully',
      });
    });
  });
});