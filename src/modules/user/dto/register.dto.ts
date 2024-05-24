import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { GenderEnum } from '@common/enums/gender.enum';

export class RegisterDto {
  @ApiProperty({
    description: 'Name',
    default: 'User',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Email',
    example: 'user@mail.maximum',
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @ApiProperty({
    description: 'specialization',
    example: 'specialization',
  })
  @IsString()
  @IsNotEmpty()
  specialization: string;

  // @ApiPropertyOptional({
  //   description: 'Name',
  //   default: 'User title',
  //   required: false,
  // })
  // @IsString()
  // @IsOptional()
  // title?: string;

  // @ApiPropertyOptional({
  //   description: 'Phone number',
  //   example: '+46-(123)-456-78-90',
  // })
  // @IsString()
  // @IsOptional()
  // @MaxLength(20)
  // @Matches(/^[0-9+\-() ]+$/, {
  //   message: PHONE_VALIDATION,
  // })
  // phone?: string;

  // @ApiPropertyOptional({
  //   description: 'Fax',
  //   example: '+46-(123)-456-78-90',
  // })
  // @IsString()
  // @IsOptional()
  // @MaxLength(20)
  // @Matches(/^[0-9+\-() ]+$/, {
  //   message: FAX_VALIDATION,
  // })
  // fax?: string;

  // @ApiProperty({
  //   description: 'Role id',
  //   example: '0c19630b-7b1a-49d2-b295-cfbf9b94a188',
  //   required: true,
  // })
  // @IsString()
  // @IsNotEmpty()
  // roleId: string;

  // @ApiProperty({
  //   description: 'Status',
  //   enum: StatusEnum,
  //   enumName: 'StatusEnum',
  //   default: StatusEnum.ACTIVE,
  //   required: true,
  // })
  // @IsEnum(StatusEnum)
  // @IsNotEmpty()
  // status: StatusEnum;

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
    description: 'User img',
    required: false,
    type: String,
    format: 'binary',
  })
  @Type(() => Object)
  @IsOptional()
  img?: Express.Multer.File;
}
