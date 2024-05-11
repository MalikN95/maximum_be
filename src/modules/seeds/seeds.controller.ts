import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SeedsService } from './seeds.service';

@ApiTags('Seeds')
@Controller('seeds')
export class SeedsController {
  constructor(private readonly seedsService: SeedsService) {}

  @Get()
  @ApiOkResponse({
    description: 'Api response',
    type: Boolean,
  })
  @ApiOperation({
    summary: 'Crate seeds',
  })
  async createUsers(): Promise<boolean | string> {
    return this.seedsService.createSeeds();
  }
}
