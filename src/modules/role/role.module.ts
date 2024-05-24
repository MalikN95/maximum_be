import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleEntity } from '@entities/role.entity';
import { UserEntity } from '@entities/user.entity';

import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
