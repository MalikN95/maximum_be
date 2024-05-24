import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @Type(() => Number)
  @Min(0)
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The number of pages to skip to',
    default: 0,
  })
  skipPages?: number = 0;

  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'The number of items to return',
    default: 10,
  })
  @IsPositive()
  @IsOptional()
  pageSize?: number = 10;
}
