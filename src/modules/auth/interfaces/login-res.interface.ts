import { TokenPayload } from '@common/types/token-payload.type';

export interface ILoginRes {
  profile: TokenPayload;
  accessToken: string;
  refreshToken: string;
}
