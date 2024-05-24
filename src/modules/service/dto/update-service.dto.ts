import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateServiceDto {
  @ApiPropertyOptional({
    description: 'Service name',
    default: 'Service',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  name?: string;

  @ApiPropertyOptional({
    description: 'Service description',
    default: 'Service description',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  description?: string;

  @ApiPropertyOptional({
    description: 'Dashboard Access',
    required: false,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  hasOnlineReception?: boolean;

  @ApiPropertyOptional({
    description: 'Service price',
    required: false,
    type: 'number',
    default: true,
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    description: 'Service duration',
    required: false,
    type: 'number',
    default: true,
  })
  @IsNumber()
  @IsOptional()
  duration?: number;
}
