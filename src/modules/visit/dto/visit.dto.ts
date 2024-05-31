import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class VisitDto {
  @ApiProperty({
    description: 'userId',
    default: 'userId',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'customerId',
    default: 'customerId',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @ApiPropertyOptional({
    description: 'startTime',
    type: Date,
    required: true,
    example: new Date('05-05-1995'),
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startTime?: Date;

  @ApiPropertyOptional({
    description: 'dateOfBirth',
    type: Date,
    required: true,
    example: new Date('05-05-1995'),
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endTime?: Date;
}
