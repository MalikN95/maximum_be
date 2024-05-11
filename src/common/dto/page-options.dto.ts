import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PageOptionsDto {
  /**
   * @default ASC
   * order type  by default
   */
  @ApiPropertyOptional({
    enum: Order,
    enumName: 'Order',
    default: Order.ASC,
    required: true,
  })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  /**
   * @default 1
   * number of the page by default
   */
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  /**
   * @default 10
   * the amount of items to be requested per page
   */
  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
