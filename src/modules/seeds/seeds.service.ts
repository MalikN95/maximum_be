import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hashSync } from 'bcrypt';
import { Repository } from 'typeorm';

import { RoleEntity } from '@entities/role.entity';
import { UserEntity } from '@entities/user.entity';

import { rolesSeed } from './data/role.seed';
import { usersSeed } from './data/users.seed';

@Injectable()
export class SeedsService {
  private logger = new Logger('SeedsService');

  constructor(
    private configService: ConfigService,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async createSeeds(): Promise<boolean | string> {
    const roles = await this.roleRepository
      .createQueryBuilder()
      .insert()
      .into(RoleEntity)
      .values(rolesSeed)
      .returning('*')
      .execute()
      .then<RoleEntity[]>((result) => result.raw);

    const salt = await genSalt(
      Number(this.configService.get<number>('SALT_VALUE'))
    );

    for (const [index, user] of usersSeed.entries()) {
      user.password = hashSync(user.password, salt);

      await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(UserEntity)
        .values({
          ...user,
          role: { id: roles[index].id },
        })
        .execute();
    }

    return true;
  }
}
