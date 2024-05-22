import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { GenderEnum } from '@common/enums/gender.enum';
import { Type } from 'class-transformer';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Name',
    default: 'User',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    description: 'E-mail',
    default: 'abc12345@gmail.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Gender',
    enum: GenderEnum,
    enumName: 'GenderEnum',
    default: GenderEnum.MALE,
    required: true,
  })
  @IsEnum(GenderEnum)
  @IsNotEmpty()
  gender: GenderEnum;

  @ApiPropertyOptional({
    description: 'dateOfBirth',
    type: Date,
    required: true,
    example: new Date('05-05-1995'),
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dateOfBirth?: Date;
}
