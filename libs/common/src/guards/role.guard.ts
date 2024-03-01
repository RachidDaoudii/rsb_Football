import {
    Injectable,
    CanActivate,
    ExecutionContext,
    Inject,
  } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { ServiceJwt } from '../helpers';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../enums/';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { log } from 'console';
  
  @Injectable()
  export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector,
        @Inject(ServiceJwt) private readonly jwtService: ServiceJwt,
        ) {}
    async canActivate(
        context: ExecutionContext,
      ): Promise<boolean | Observable<boolean> | any> {
        const request: Request = context.switchToHttp().getRequest();
        const response: Response = context.switchToHttp().getResponse();
        try {
            
            const roles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);
            if (!roles) {
                return true;
            }
            const token = request.headers?.cookie?.split('=')[1];
            if (!token) {
                throw new Error(
                    'You are not authentified, please login',
                );
            }
            const verify = await this.jwtService.verify(token);
            if (!verify) {
                throw new Error(
                    'You access token is not valid',
                );
            }
            if (roles.includes(verify.role)) {
                return true;
            }
            throw new Error(
                'You do not have the right to access this resource',
            );
        } catch (error) {
            response.status(403).json({ message: error.message});
            return false;
            
        }
    }
    
    
  }