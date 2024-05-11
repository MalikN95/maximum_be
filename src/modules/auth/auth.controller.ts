import { Body, Controller, Get, Logger, Post, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ILoginRes } from '@modules/auth/interfaces/login-res.interface';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger('AuthController');

  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 200, type: Object })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOperation({
    summary: 'User login',
  })
  async login(@Body() loginDto: LoginDto): Promise<ILoginRes> {
    const user = await this.authService.validateUser(loginDto);

    return this.authService.login(user);
  }

  @Post('refresh-token')
  @ApiResponse({ status: 200, type: Object })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOperation({
    summary: 'Refresh access token',
  })
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto
  ): Promise<ILoginRes> {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
