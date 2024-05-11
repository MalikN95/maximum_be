import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 100 })
  description: string;

  @Column({ default: false })
  dashboardAccess: boolean;

  @Column({ default: false })
  dashboardSheetsAccess: boolean;

  @Column({ default: false })
  submissionAccess: boolean;

  @Column({ default: false })
  todoAccess: boolean;

  @Column({ default: false })
  statisticsAccess: boolean;

  @Column({ default: false })
  settingAccess: boolean;

  @Column({ default: false })
  loggingAccess: boolean;

  @Column({ default: false })
  usersAccess: boolean;

  @Column({ default: false })
  rolesAccess: boolean;

  @Column({ default: false })
  listsAccess: boolean;

  @Column({ default: false })
  reminderAccess: boolean;

  @Column({ default: false })
  payoutTransaction: boolean;

  @Column({ default: false })
  dataExport: boolean;

  @OneToMany(() => UserEntity, (user) => user.role)
  user: UserEntity[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
