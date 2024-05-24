import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { VisitStatusEnum } from '@common/enums/visit-status.enum';

export class VisitFilterDto {
  @ApiPropertyOptional({
    description: 'Status',
    enum: VisitStatusEnum,
    enumName: 'VisitStatusEnum',
    default: VisitStatusEnum.PENDING,
    required: true,
  })
  @IsEnum(VisitStatusEnum)
  @IsOptional()
  status?: VisitStatusEnum;

  @ApiPropertyOptional({
    description: 'employeeId',
    default: 'employeeId',
    required: false,
  })
  @IsString()
  @IsOptional()
  employeeId?: string;
}
