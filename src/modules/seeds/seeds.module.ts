import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleEntity } from '@entities/role.entity';
import { UserEntity } from '@entities/user.entity';

import { SeedsController } from './seeds.controller';
import { SeedsService } from './seeds.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  controllers: [SeedsController],
  providers: [SeedsService],
})
export class SeedsModule {}
