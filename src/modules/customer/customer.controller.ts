import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationDto } from '@common/dto/pagination.dto';
import { CustomerEntity } from '@entities/customer.entity';
import { PaginationResult } from '@common/interfaces/pagination-res.interface';
import { CreateCustomerDto } from './dto/customer.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '@common/decorators/user.decorator';
import { UserEntity } from '@entities/user.entity';

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
    @Query() paginationDto: PaginationDto
  ): Promise<PaginationResult<CustomerEntity>> {
    return this.customerService.getCustomerList(paginationDto);
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
