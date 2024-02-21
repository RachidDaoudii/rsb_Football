import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { log } from 'console';

const getCurrentUserByContext = (context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return getCurrentUserByContext(context);
  },
  // getCurrentUserByContext(context),
);
