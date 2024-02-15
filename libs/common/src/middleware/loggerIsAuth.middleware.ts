import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ServiceJwt } from '../helpers';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: ServiceJwt) {}
  use(req: Request, res: Response, next: NextFunction) {
    next();
  }

  async isAuth(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers.cookie) {
        throw new Error();
      }
      const tokenCoockie = req.headers.cookie.split('=')[1];

      const verifyToken = await this.jwtService.verify(tokenCoockie);
      console.log(verifyToken);

      console.log(tokenCoockie);

      // if (!tokenCoockie || !verifyToken) {
      //   throw new Error();
      // }

      next();
    } catch (error) {
      console.log(error);

      res.status(401).json({ message: 'Token Invalid or Not Provided' });
    }
  }
}
