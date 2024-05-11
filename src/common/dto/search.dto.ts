import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @ApiPropertyOptional({
    description: 'Search value',
    required: true,
    example: 'User',
    default: 'User',
  })
  @IsString()
  @IsOptional()
  searchValue?: string;
}
