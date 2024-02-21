import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ServiceJwt } from '../helpers';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(@Inject(ServiceJwt) private readonly jwtService: ServiceJwt) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.cookie.split('=')[1];
      //   const { id } = await this.jwtService.verify(token);

      const UserId = '143c2e45-0501-4662-aa65-43333cf7332f';

      if (!token) {
        throw new Error('Missing authentication token');
      }

      const { id } = await this.jwtService.verify(token);

      const expectedUserId = '143c2e45-0501-4662-aa65-43333cf7332f';

      if (id !== expectedUserId) {
        throw new Error('Unauthorized access');
      }

      const now = Date.now();
      return next
        .handle()
        .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
    } catch (error) {
      console.log('Error:', error);
    }
  }
}
