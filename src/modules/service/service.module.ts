import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServiceEntity } from '@entities/service.entity';
import { UserServiceEntity } from '@entities/user-service.entity';

import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity, UserServiceEntity])],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
