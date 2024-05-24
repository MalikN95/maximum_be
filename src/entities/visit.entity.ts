import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CustomerEntity } from './customer.entity';
import { UserEntity } from './user.entity';
import { VisitStatusEnum } from '@common/enums/visit-status.enum';

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
}
