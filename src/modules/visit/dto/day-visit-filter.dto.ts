import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Type } from 'class-transformer';

export class DayVisitFilterDto {
  @ApiProperty({
    description: 'day',
    type: Date,
    required: true,
    example: new Date('05-05-1995'),
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  day: Date;

  @ApiPropertyOptional({
    description: 'employeeId',
    default: 'employeeId',
    required: false,
  })
  @IsString()
  @IsOptional()
  employeeId?: string;
}
