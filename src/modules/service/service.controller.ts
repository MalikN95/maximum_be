import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ServiceService } from './service.service';
import { PaginationDto } from '@common/dto/pagination.dto';
import { SearchDto } from '@common/dto/search.dto';
import { AuthGuard } from '@nestjs/passport';
import { ServiceEntity } from '@entities/service.entity';
import { PaginationResult } from '@common/interfaces/pagination-res.interface';
import { UpdateServiceDto } from './dto/update-service.dto';

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
  updateRole(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto
  ): Promise<ServiceEntity> {
    return this.serviceService.updateService(id, updateServiceDto);
  }
}
