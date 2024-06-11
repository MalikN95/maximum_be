import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { PaginationDto } from '@common/dto/pagination.dto';
import { SearchDto } from '@common/dto/search.dto';
import { PaginationResult } from '@common/interfaces/pagination-res.interface';
import { VisitEntity } from '@entities/visit.entity';

import { VisitFilterDto } from './dto/visit-filter.dto';
import { VisitDto } from './dto/visit.dto';
import { VisitService } from './visit.service';
import { DayVisitFilterDto } from './dto/day-visit-filter.dto';

@ApiTags('visit')
@Controller('visit')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Get('list')
  @ApiResponse({ status: 200, type: VisitEntity })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOperation({
    summary: 'Get visit list with pagination',
  })
  @UseGuards(AuthGuard('jwt'))
  getVisitList(
    @Query() paginationDto: PaginationDto,
    @Query() searchDto: SearchDto,
    @Query() visitFilterDto: VisitFilterDto
  ): Promise<PaginationResult<VisitEntity>> {
    return this.visitService.getVisitList(
      paginationDto,
      searchDto,
      visitFilterDto
    );
  }

  @Get('day')
  @ApiResponse({ status: 200, type: VisitEntity })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOperation({
    summary: 'Get visit list with pagination',
  })
  @UseGuards(AuthGuard('jwt'))
  getDayVisitList(
    @Query() dayVisitFilterDto: DayVisitFilterDto
  ): Promise<VisitEntity[][]> {
    return this.visitService.getDayVisitList(dayVisitFilterDto);
  }

  @Post()
  @ApiResponse({ status: 200, type: VisitEntity })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOperation({
    summary: 'Add visit',
  })
  addVisit(@Body() visitDto: VisitDto): Promise<VisitEntity> {
    return this.visitService.addVisit(visitDto);
  }
}
