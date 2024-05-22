import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationDto } from '@common/dto/pagination.dto';
import { PaginationResult } from '@common/interfaces/pagination-res.interface';
import { RoleEntity } from '@entities/role.entity';
import { UserEntity } from '@entities/user.entity';

import { RoleSortDto } from './dto/role-sort.dto';
import { RoleDto } from './dto/role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { USER_CAN_NOT_DELETE_OWN_ROLE } from './role.constants';

@Injectable()
export class RoleService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(RoleEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getRoleList(
    paginationDto: PaginationDto,
    roleSortDto: RoleSortDto
  ): Promise<PaginationResult<RoleEntity>> {
    const { skipPages, pageSize } = paginationDto;
    const { order, sort } = roleSortDto;

    const [result, total] = await this.roleRepository
      .createQueryBuilder('role')
      .skip(pageSize * skipPages)
      .take(pageSize)
      .orderBy(`role.${sort}`, `${order}`)
      .getManyAndCount();

    return {
      data: result,
      count: total,
    };
  }

  async getAllRole(): Promise<RoleEntity[]> {
    const roles = await this.roleRepository
      .createQueryBuilder('role')
      .getMany();

    return roles;
  }

  async createRole(roleDto: RoleDto): Promise<RoleEntity> {
    const role = await this.roleRepository
      .createQueryBuilder()
      .insert()
      .into(RoleEntity)
      .values({
        ...roleDto,
      })
      .orIgnore()
      .returning('*')
      .execute()
      .then<RoleEntity>((result) => result.raw[0]);

    return role;
  }

  async updateRole(
    id: string,
    updateRoleDto: UpdateRoleDto
  ): Promise<RoleEntity> {
    const updateRole = await this.roleRepository
      .createQueryBuilder('role')
      .update(RoleEntity)
      .set({ ...updateRoleDto })
      .where('id = :id', { id })
      .returning('*')
      .execute()
      .then<RoleEntity>((result) => result.raw[0]);

    if (!updateRole) throw new NotFoundException();

    return updateRole;
  }

  async deleteRoleById(id: string, user: UserEntity): Promise<RoleEntity> {
    const checkRole = await this.roleRepository
      .createQueryBuilder('role')
      .delete()
      .from(RoleEntity)
      .where('id = :id', { id })
      .returning('*')
      .execute()
      .then<RoleEntity>((result) => result.raw[0]);

    if (!checkRole) throw new NotFoundException();

    return checkRole;
  }
}
