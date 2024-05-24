import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetUser } from '@common/decorators/user.decorator';
import { PaginationDto } from '@common/dto/pagination.dto';
import { SearchDto } from '@common/dto/search.dto';
import { PaginationResult } from '@common/interfaces/pagination-res.interface';
import { CustomerEntity } from '@entities/customer.entity';
import { UserEntity } from '@entities/user.entity';

import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/customer.dto';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('list')
  @ApiResponse({ status: 200, type: CustomerEntity })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'Api response',
    type: CustomerEntity,
  })
  getCustomerList(
    @GetUser() user: UserEntity,
    @Query() paginationDto: PaginationDto,
    @Query() searchDto: SearchDto
  ): Promise<PaginationResult<CustomerEntity>> {
    return this.customerService.getCustomerList(paginationDto, searchDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Object })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Customer id',
  })
  getUser(@Param('id') id: string): Promise<CustomerEntity> {
    return this.customerService.getCustomer(id);
  }

  @Post()
  @ApiResponse({ status: 200, type: Object })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  recoverPassword(
    @Body() createCustomerDto: CreateCustomerDto
  ): Promise<CustomerEntity> {
    return this.customerService.createCustomer(createCustomerDto);
  }
}
