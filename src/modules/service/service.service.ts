import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationDto } from '@common/dto/pagination.dto';
import { SearchDto } from '@common/dto/search.dto';
import { PaginationResult } from '@common/interfaces/pagination-res.interface';
import { ServiceEntity } from '@entities/service.entity';
import { UserServiceEntity } from '@entities/user-service.entity';

import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(UserServiceEntity)
    private readonly userServiceRepository: Repository<UserServiceEntity>
  ) {}

  async getServiceList(
    paginationDto: PaginationDto,
    searchDto: SearchDto
  ): Promise<PaginationResult<ServiceEntity>> {
    const { skipPages, pageSize } = paginationDto;
    const { searchValue } = searchDto;

    let searchWords: string[];

    if (searchValue)
      searchWords = searchValue
        .trim()
        .split(' ')
        .map((keyword) => `%${keyword}%`);

    const [result, total] = await this.serviceRepository
      .createQueryBuilder('service')
      .where(
        searchValue
          ? `( 
            service.name ILIKE ANY(:searchValue)
          )`
          : 'true = true',
        {
          searchValue: searchWords,
        }
      )
      .skip(pageSize * skipPages)
      .take(pageSize)
      .orderBy(`service.name`, 'ASC')
      .getManyAndCount();

    return {
      data: result,
      count: total,
    };
  }

  async updateService(
    id: string,
    updateServiceDto: UpdateServiceDto
  ): Promise<ServiceEntity> {
    const { serviceEmployee, ...data } = updateServiceDto;

    const updateService = await this.serviceRepository
      .createQueryBuilder('service')
      .update(ServiceEntity)
      .set({ ...data })
      .where('id = :id', { id })
      .returning('*')
      .execute()
      .then<ServiceEntity>((result) => result.raw[0]);

    if (serviceEmployee) {
      await this.userServiceRepository
        .createQueryBuilder('userService')
        .delete()
        .from(UserServiceEntity)
        .where('service.id = :id', { id })
        .execute();

      for (const employeeId of serviceEmployee) {
        await this.userServiceRepository
          .createQueryBuilder('userService')
          .insert()
          .into(UserServiceEntity)
          .values({
            service: { id },
            user: { id: employeeId },
          })
          .orIgnore()
          .execute();
      }
    }

    return updateService;
  }

  async createService(
    createServiceDto: CreateServiceDto
  ): Promise<ServiceEntity> {
    const { ...data } = createServiceDto;

    const newService = await this.serviceRepository
      .createQueryBuilder('service')
      .insert()
      .into(ServiceEntity)
      .values({ ...data })
      .returning('*')
      .execute()
      .then<ServiceEntity>((result) => result.raw[0]);

    return newService;
  }

  async getService(id: string): Promise<ServiceEntity> {
    const service = await this.serviceRepository
      .createQueryBuilder('service')
      .leftJoinAndSelect('service.userService', 'userService')
      .leftJoinAndSelect('userService.user', 'user')
      .where('service.id = :id', { id })
      .getOne();

    return service;
  }
}
