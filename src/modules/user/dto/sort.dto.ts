import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Order } from '@common/dto/page-options.dto';
import { UserSortEnum } from '@common/enums/user-sort.enum';

export class UserSortDto {
  @ApiProperty({
    enum: UserSortEnum,
    enumName: 'UserSortEnum',
    default: UserSortEnum.NAME,
    required: true,
  })
  @IsEnum(UserSortEnum)
  @IsNotEmpty()
  sort: UserSortEnum = UserSortEnum.NAME;

  @ApiProperty({
    enum: Order,
    enumName: 'Order',
    default: Order.ASC,
    required: true,
  })
  @IsEnum(Order)
  @IsNotEmpty()
  order: Order = Order.ASC;

  @ApiPropertyOptional({
    description: 'Status array',
    default: 'Member',
    required: false,
    example: '["Active", "Inactive"]',
  })
  @IsString()
  @IsOptional()
  statuses?: string;

  @ApiPropertyOptional({
    description: 'User role',
    example: 'Clerk',
    default: 'Clerk',
    required: false,
  })
  @IsString()
  @IsOptional()
  role?: string;
}
