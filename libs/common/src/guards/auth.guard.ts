import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  ConflictException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { ServiceJwt } from '../helpers';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(ServiceJwt) private readonly jwtService: ServiceJwt) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean | Observable<boolean> | any> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();


    try {
      const token = request.headers?.cookie?.split('=')[1];
      
      if (!request?.headers?.cookie?.split('=')[1]) {
        throw new Error(
          'You are not authentified, please login',
        );
        
      }

      if (!token) {
        return false;
      }

      const verify = await this.jwtService.verify(token);

      if (!verify) {
        throw new Error(
          'You access token is not valid',
        );
      }

      return true;
    } catch (error) {
      // response.status(401).json({ message: error.message});
      throw new ConflictException(error.message);
    }
  }
}
