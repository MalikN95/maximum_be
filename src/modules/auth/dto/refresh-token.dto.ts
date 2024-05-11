import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'refreshToken',
    example: 'refreshToken',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
