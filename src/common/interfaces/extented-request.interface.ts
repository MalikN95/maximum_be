import { Request } from 'express';

import { TokenPayload } from '@common/types/token-payload.type';

export interface ExtededRequestInterface extends Request {
  user?: TokenPayload;
}
