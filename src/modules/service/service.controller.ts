import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { PaginationDto } from '@common/dto/pagination.dto';
import { SearchDto } from '@common/dto/search.dto';
import { PaginationResult } from '@common/interfaces/pagination-res.interface';
import { ServiceEntity } from '@entities/service.entity';

import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceService } from './service.service';

@ApiTags('service')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get('list')
  @ApiResponse({ status: 200, type: ServiceEntity })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOperation({
    summary: 'Get service list with pagination',
  })
  @UseGuards(AuthGuard('jwt'))
  getServiceList(
    @Query() paginationDto: PaginationDto,
    @Query() searchDto: SearchDto
  ): Promise<PaginationResult<ServiceEntity>> {
    return this.serviceService.getServiceList(paginationDto, searchDto);
  }

  @Get('by-id/:id')
  @ApiResponse({ status: 200, type: Object })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'User id',
  })
  getService(@Param('id') id: string): Promise<ServiceEntity> {
    return this.serviceService.getService(id);
  }

  @Patch('by-id/:id')
  @ApiResponse({ status: 200, type: ServiceEntity })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOperation({
    summary: 'Update service by id',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Role id',
  })
  updateService(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto
  ): Promise<ServiceEntity> {
    return this.serviceService.updateService(id, updateServiceDto);
  }

  @Post()
  @ApiResponse({ status: 200, type: ServiceEntity })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOperation({
    summary: 'Create service',
  })
  @UseGuards(AuthGuard('jwt'))
  createService(
    @Body() createServiceDto: CreateServiceDto
  ): Promise<ServiceEntity> {
    return this.serviceService.createService(createServiceDto);
  }
}
