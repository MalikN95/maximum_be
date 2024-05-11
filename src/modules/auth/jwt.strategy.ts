import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { StatusEnum } from '@common/enums/status.enum';
import { TokenPayload } from '@common/types/token-payload.type';

import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: TokenPayload): Promise<TokenPayload> {
    const { id } = payload;
    const user = await this.authService.validateUserById(id);

    if (!user || user.status !== StatusEnum.ACTIVE) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
