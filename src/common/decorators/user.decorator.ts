import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ExtededRequestInterface } from '@common/interfaces/extented-request.interface';
import { TokenPayload } from '@common/types/token-payload.type';

export const GetUser = createParamDecorator(
  (property: Partial<keyof TokenPayload>, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<ExtededRequestInterface>();

    if (!request.user) {
      return null;
    }

    if (property) {
      return request.user[property];
    }

    return request.user;
  }
);
