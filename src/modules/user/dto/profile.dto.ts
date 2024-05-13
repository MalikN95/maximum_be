import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import { StatusEnum } from '@common/enums/status.enum';
import { GenderEnum } from '@common/enums/gender.enum';

export class ProfileDto {
  @ApiPropertyOptional({
    description: 'Name',
    default: 'User',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Email',
    default: 'user@mail.maximum',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'hasOnlineReception',
    default: 'true',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  hasOnlineReception?: boolean;

  @ApiPropertyOptional({
    description: 'hasServiceAccess',
    default: 'true',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  hasServiceAccess?: boolean;

  @ApiPropertyOptional({
    description: 'Status',
    enum: StatusEnum,
    enumName: 'StatusEnum',
    default: StatusEnum.ACTIVE,
    required: true,
  })
  @IsEnum(StatusEnum)
  @IsOptional()
  status?: StatusEnum;

  @ApiPropertyOptional({
    description: 'Gender',
    enum: GenderEnum,
    enumName: 'GenderEnum',
    default: GenderEnum.MALE,
    required: true,
  })
  @IsEnum(GenderEnum)
  @IsOptional()
  gender?: GenderEnum;
}
