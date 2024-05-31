import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserServiceEntity } from './user-service.entity';

@Entity('service')
export class ServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 100 })
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column()
  duration: number;

  @Column({ default: false })
  hasOnlineReception: boolean;

  @OneToMany(() => UserServiceEntity, (userService) => userService.service, {
    onDelete: 'SET NULL',
  })
  userService: UserServiceEntity[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
