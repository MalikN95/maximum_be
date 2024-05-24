import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VisitService } from './visit.service';
import { VisitEntity } from '@entities/visit.entity';
import { VisitDto } from './dto/visit.dto';
import { PaginationDto } from '@common/dto/pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationResult } from '@common/interfaces/pagination-res.interface';
import { SearchDto } from '@common/dto/search.dto';
import { VisitFilterDto } from './dto/visit-filter.dto';

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
