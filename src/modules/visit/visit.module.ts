import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VisitEntity } from '@entities/visit.entity';

import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';

@Module({
  imports: [TypeOrmModule.forFeature([VisitEntity])],
  controllers: [VisitController],
  providers: [VisitService],
})
export class VisitModule {}
