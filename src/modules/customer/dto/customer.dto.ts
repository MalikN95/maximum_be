import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { GenderEnum } from '@common/enums/gender.enum';

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
}
