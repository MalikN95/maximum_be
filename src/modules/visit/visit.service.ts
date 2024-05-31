import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationDto } from '@common/dto/pagination.dto';
import { SearchDto } from '@common/dto/search.dto';
import { PaginationResult } from '@common/interfaces/pagination-res.interface';
import { VisitEntity } from '@entities/visit.entity';

import { VisitFilterDto } from './dto/visit-filter.dto';
import { VisitDto } from './dto/visit.dto';

@Injectable()
export class VisitService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(VisitEntity)
    private readonly visitRepository: Repository<VisitEntity>
  ) {}

  async getVisitList(
    paginationDto: PaginationDto,
    searchDto: SearchDto,
    visitFilterDto: VisitFilterDto
  ): Promise<PaginationResult<VisitEntity>> {
    const { skipPages, pageSize } = paginationDto;
    const { searchValue } = searchDto;
    const { status, employeeId } = visitFilterDto;

    let searchWords: string[];

    if (searchValue)
      searchWords = searchValue
        .trim()
        .split(' ')
        .map((keyword) => `%${keyword}%`);

    const [result, total] = await this.visitRepository
      .createQueryBuilder('visit')
      .leftJoinAndSelect('visit.user', 'user')
      .leftJoinAndSelect('visit.customer', 'customer')
      .where(
        searchValue
          ? `( 
            customer.name ILIKE ANY(:searchValue)
            OR user.name ILIKE ANY(:searchValue) 
            )`
          : 'true = true',
        {
          searchValue: searchWords,
        }
      )
      .andWhere(status ? 'visit.status = :status' : 'true', { status })
      .andWhere(employeeId ? 'user.id = :employeeId' : 'true', { employeeId })
      .skip(pageSize * skipPages)
      .take(pageSize)
      .orderBy(`visit.startTime`, 'ASC')
      .getManyAndCount();

    return {
      data: result,
      count: total,
    };
  }

  async addVisit(visitDto: VisitDto): Promise<VisitEntity> {
    const { customerId, userId, ...data } = visitDto;
    const visit = await this.visitRepository
      .createQueryBuilder()
      .insert()
      .into(VisitEntity)
      .values({
        ...data,
        user: { id: userId },
        customer: { id: customerId },
      })
      .orIgnore()
      .returning('*')
      .execute()
      .then<VisitEntity>((result) => result.raw[0]);

    return visit;
  }
}
