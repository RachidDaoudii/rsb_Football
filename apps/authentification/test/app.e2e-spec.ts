// // import { Test, TestingModule } from '@nestjs/testing';
// // import { INestApplication } from '@nestjs/common';
// // import * as request from 'supertest';
// // import { AuthModule } from '../src/auth';

// // describe('AuthentificationController (e2e)', () => {
// //   let app: INestApplication;

// //   beforeEach(async () => {
// //     const moduleFixture: TestingModule = await Test.createTestingModule({
// //       imports: [AuthModule],
// //     }).compile();

// //     app = moduleFixture.createNestApplication();
// //     await app.init();
// //   });

// //   it('/ (GET)', () => {
// //     return request(app.getHttpServer())
// //       .post('api/auth/login')
// //       .send({
// //         firstName:"",
// //         lastName:"",
// //         email:"",
// //         password:"daoudi123"
// //       })
// //       .expect(400)
// //       .expect(
// //         {
// //           "statusCode": 400,
// //           "message": [
// //             "firstName should not be empty",
// //             "lastName should not be empty",
// //             "email should not be empty",
// //             "password should not be empty"
// //         ],
// //           "error": "Bad Request"
// //       }
// //       );




// //   });
// // });


// import { Test, TestingModule } from '@nestjs/testing';
// import { UserService } from '../user/user.service';
// import {
//   blogService,
//   MANAGEMENTCLUB,
// } from '@app/common/constant';
// import { UserRepository } from '../user/user.repository';
// import { EntityManager } from 'typeorm';
// import { CreateUserDto } from '../user/dto/create-user.dto';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AuthController } from './auth.controller';
// import { ServiceJwt, bcryptService } from '@app/common';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthService } from './auth.service';
// import { ValidationPipe } from '@nestjs/common';
// import { LocalAuthGuard } from './guards';
// import { PassportModule } from '@nestjs/passport';
// import { log } from 'console';

// describe('UserController', () => {
//   let app: INestApplication;
//   let controller: AuthController;
//   let serviceauth: AuthService;
  
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [JwtModule,PassportModule],
//       controllers: [AuthController],
//       providers: [AuthService,UserService,UserRepository,ServiceJwt,bcryptService,EntityManager,LocalAuthGuard,
//         {
//           provide: blogService,
//           useValue: {
//             send: jest.fn(),
//           },
//         },
//         {
//           provide: MANAGEMENTCLUB,
//           useValue: {
//             send: jest.fn(),
//           },
//         },
//         {
//           provide: 'UserRepository',
//           useValue: {
//             create: jest.fn(),
//             findOne: jest.fn(),
//           },
//         },
//         {
//           provide: 'bcryptService',
//           useValue: {
//             hash: jest.fn(),
//           },
//         }],
//     }).overrideGuard(LocalAuthGuard)
//     .useValue({ canActivate: () => true }).compile();

//     controller = module.get<AuthController>(AuthController);
//     serviceauth = module.get<AuthService>(AuthService);

//     app = module.createNestApplication();
//     app.useGlobalPipes(new ValidationPipe());
//     await app.init();
//   });

//   let responseMock: Response;
//   let requestMock: Request;
  
//   // afterEach(async () => {
//   //   await app.close();
//   // });

//   // beforeEach(() => {
    
//   // });
//   responseMock = {
//     status: jest.fn().mockReturnThis(),
//     json: jest.fn().mockReturnThis(),
//     cookie: jest.fn().mockReturnThis(),

//   } as any;
//   requestMock = {
//     body: {},
//     user: {},
//   } as any;

//   it('Signing Up', async () => {
//     const createUserDto: CreateUserDto = {
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: ""
//     };

//     const response = await request(app.getHttpServer())
//       .post('/api/auth/register')
//       .send(createUserDto);

//     expect(response.status).toBe(400);
//     expect(response.body).toEqual({
//       statusCode: 400,
//       message: [
//         "firstName should not be empty",
//         "lastName should not be empty",
//         "email should not be empty",
//         "password should not be empty"
//       ],
//       error: "Bad Request"
//     });
    
//   });

//   it('Signing In', async () => {
//     const response = await request(app.getHttpServer())
//     .post('/api/auth/login')
//     .send({email:"rachiddaoudi553@gmail.com",password:"daoudi123"});
//     expect(response.status).toBe(201);

//     },15000);
  
// });