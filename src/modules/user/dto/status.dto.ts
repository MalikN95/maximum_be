import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { StatusEnum } from '@common/enums/status.enum';

export class StatusDto {
  @ApiProperty({
    description: 'Status',
    enum: StatusEnum,
    enumName: 'StatusEnum',
    default: StatusEnum.ACTIVE,
    required: true,
  })
  @IsEnum(StatusEnum)
  @IsNotEmpty()
  status: StatusEnum;
}
