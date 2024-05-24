import { PaginationDto } from '@common/dto/pagination.dto';
import { SearchDto } from '@common/dto/search.dto';
import { PaginationResult } from '@common/interfaces/pagination-res.interface';
import { ServiceEntity } from '@entities/service.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>
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
    const updateService = await this.serviceRepository
      .createQueryBuilder('service')
      .update(ServiceEntity)
      .set({ ...updateServiceDto })
      .where('id = :id', { id })
      .returning('*')
      .execute()
      .then<ServiceEntity>((result) => result.raw[0]);

    return updateService;
  }
}
