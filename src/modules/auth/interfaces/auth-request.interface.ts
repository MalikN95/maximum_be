import { Request } from 'express';

import { TokenPayload } from '@common/types/token-payload.type';

export interface AuthRequest extends Request {
  user: TokenPayload;
}
