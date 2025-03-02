import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { VisitStatusEnum } from '@common/enums/visit-status.enum';

import { CustomerEntity } from './customer.entity';
import { UserEntity } from './user.entity';

@Entity('visit')
export class VisitEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: VisitStatusEnum,
    default: VisitStatusEnum.PENDING,
  })
  status: VisitStatusEnum;

  @Column({ type: 'timestamptz' })
  startTime: Date;

  @Column({ type: 'timestamptz' })
  endTime: Date;

  @ManyToOne(() => UserEntity, (user) => user.visit)
  user: UserEntity;

  @ManyToOne(() => CustomerEntity, (customer) => customer.visit)
  customer: CustomerEntity;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  randomId: string;
}
