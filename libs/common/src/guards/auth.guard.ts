import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { ServiceJwt } from '../helpers/jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(ServiceJwt) private readonly jwtService: ServiceJwt) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean | Observable<boolean> | any> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    try {
      const token = request.headers.cookie.split('=')[1];

      if (!request.headers.cookie) {
        throw new Error();
      }

      if (!token) {
        return false;
      }

      const verify = await this.jwtService.verify(token);

      if (!verify) {
        throw new Error();
      }

      return true;
    } catch (error) {
      response.status(401).json({ message: 'Token Invalid or Not Provided' });
      return false;
    }
  }
}
