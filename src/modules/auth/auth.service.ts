import {
  HttpException,
  Injectable,
  Logger,
  Catch,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { addDays, addMonths, subMonths } from 'date-fns';
import { Repository } from 'typeorm';

import { StatusEnum } from '@common/enums/status.enum';
import { TokenPayload } from '@common/types/token-payload.type';
import { UserEntity } from '@entities/user.entity';
import { ILoginRes } from '@modules/auth/interfaces/login-res.interface';

import {
  ACCOUNT_NOT_EXIST,
  FOURTEEN_DAYS,
  PASSWORD_CHANGE_REQUIRED,
  PASSWORD_EXPIRED,
  SIX_MONTH,
  WRONG_EMAIL_OR_PASSWORD,
} from './auth.constants';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
@Catch(HttpException)
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async login(user: UserEntity): Promise<ILoginRes> {
    const passwordChangeDateEnd = subMonths(new Date(), SIX_MONTH);
    const passwordChangeDateStart = addDays(
      passwordChangeDateEnd,
      FOURTEEN_DAYS
    );
    const passwordChangeLastDay = addMonths(
      new Date(user.lastPasswordUpdate),
      SIX_MONTH
    );

    const tokenPayload: TokenPayload = {
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
      phone: user.phone,
      fax: user.fax,
      passwordChangeLastDay,
      isAdmin: user.isAdmin,
      needPasswordChange:
        user.lastPasswordUpdate < passwordChangeDateStart ? true : false,
    };

    return {
      profile: tokenPayload,
      accessToken: await this.createAccessToken(tokenPayload),
      refreshToken: await this.createRefreshToken(tokenPayload),
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<ILoginRes> {
    const { refreshToken } = refreshTokenDto;
    let token: TokenPayload;

    try {
      token = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (err) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.email = :email', { email: token.email })
      .andWhere('user.status = :status', { status: StatusEnum.ACTIVE })
      .getOne();

    if (!user) throw new UnauthorizedException();

    const passwordChangeDateEnd = subMonths(new Date(), SIX_MONTH);
    const passwordChangeDateStart = addDays(
      passwordChangeDateEnd,
      FOURTEEN_DAYS
    );
    const passwordChangeLastDay = addMonths(
      new Date(user.lastPasswordUpdate),
      SIX_MONTH
    );

    if (user.lastPasswordUpdate < passwordChangeDateEnd)
      throw new UnauthorizedException(PASSWORD_EXPIRED);

    const tokenPayload: TokenPayload = {
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
      phone: user.phone,
      fax: user.fax,
      passwordChangeLastDay,
      isAdmin: user.isAdmin,
      needPasswordChange:
        user.lastPasswordUpdate < passwordChangeDateStart ? true : false,
    };

    return {
      profile: tokenPayload,
      accessToken: await this.createAccessToken(tokenPayload),
      refreshToken: await this.createRefreshToken(tokenPayload),
    };
  }

  async validateUser(loginDto: LoginDto): Promise<UserEntity> {
    const { email, password } = loginDto;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.email = :email', { email })
      .addSelect(['user.password'])
      .getOne();

    if (!user) {
      throw new UnauthorizedException(WRONG_EMAIL_OR_PASSWORD);
    }

    if (!user.password) {
      throw new UnauthorizedException(PASSWORD_CHANGE_REQUIRED);
    }

    if (!user.hasServiceAccess && !user.isAdmin) {
      throw new UnauthorizedException(ACCOUNT_NOT_EXIST);
    }

    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_EMAIL_OR_PASSWORD);
    }

    return user;
  }

  async validateUserById(userId: string): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: userId })
      .leftJoinAndSelect('user.role', 'role')
      .getOne();

    return user;
  }

  async createAccessToken(tokenPayload: TokenPayload): Promise<string> {
    const options = {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN'),
    };

    return this.jwtService.sign(tokenPayload, options);
  }

  async createRefreshToken(tokenPayload: TokenPayload): Promise<string> {
    const options = {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN'),
    };

    return this.jwtService.sign(tokenPayload, options);
  }
}
