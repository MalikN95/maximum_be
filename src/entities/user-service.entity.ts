import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { ServiceEntity } from './service.entity';
import { UserEntity } from './user.entity';

@Entity('user-service')
@Unique(['user', 'service'])
export class UserServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.userService, {
    onDelete: 'SET NULL',
  })
  user: UserEntity;

  @ManyToOne(() => ServiceEntity, (service) => service.userService, {
    onDelete: 'SET NULL',
  })
  service: ServiceEntity;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
