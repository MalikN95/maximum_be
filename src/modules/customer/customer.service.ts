import { PaginationDto } from '@common/dto/pagination.dto';
import { PaginationResult } from '@common/interfaces/pagination-res.interface';
import { CustomerEntity } from '@entities/customer.entity';
import { EmailService } from '@modules/email/email.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/customer.dto';
import { SearchDto } from '@common/dto/search.dto';

@Injectable()
export class CustomerService {
  constructor(
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,

    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>
  ) {}

  async getCustomerList(
    paginationDto: PaginationDto,
    searchDto: SearchDto
  ): Promise<PaginationResult<CustomerEntity>> {
    const { skipPages, pageSize } = paginationDto;
    const { searchValue } = searchDto;

    let searchWords: string[];

    if (searchValue)
      searchWords = searchValue
        .trim()
        .split(' ')
        .map((keyword) => `%${keyword}%`);

    const [result, total] = await this.customerRepository
      .createQueryBuilder('customer')
      .where(
        searchValue
          ? `( 
            customer.name ILIKE ANY(:searchValue) OR 
            customer.email ILIKE ANY(:searchValue) OR 
            customer.phone ILIKE ANY(:searchValue)
            )`
          : 'true = true',
        {
          searchValue: searchWords,
        }
      )
      .skip(pageSize * skipPages)
      .take(pageSize)
      .orderBy('customer.name', 'ASC')
      .getManyAndCount();

    return {
      data: result,
      count: total,
    };
  }

  async getCustomer(id: string): Promise<CustomerEntity> {
    const customer = await this.customerRepository
      .createQueryBuilder('customer')
      .where('id = :id', { id })
      .getOne();

    return customer;
  }

  async createCustomer(
    createCustomerDto: CreateCustomerDto
  ): Promise<CustomerEntity> {
    const customer = await this.customerRepository
      .createQueryBuilder('customer')
      .insert()
      .into(CustomerEntity)
      .values(createCustomerDto)
      .orIgnore()
      .returning('*')
      .execute()
      .then<CustomerEntity>((result) => result.raw[0]);

    return customer;
  }
}
