import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { Order } from '@common/dto/page-options.dto';
import { RoleSortEnum } from '@common/enums/role-sort.enum';

export class RoleSortDto {
  @ApiProperty({
    enum: RoleSortEnum,
    enumName: 'RoleSortEnum',
    default: RoleSortEnum.NAME,
    required: true,
  })
  @IsEnum(RoleSortEnum)
  @IsNotEmpty()
  sort: RoleSortEnum = RoleSortEnum.NAME;

  @ApiProperty({
    enum: Order,
    enumName: 'Order',
    default: Order.ASC,
    required: true,
  })
  @IsEnum(Order)
  @IsNotEmpty()
  order: Order = Order.ASC;
}
