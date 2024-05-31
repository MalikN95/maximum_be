import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { GenderEnum } from '@common/enums/gender.enum';
import { StatusEnum } from '@common/enums/status.enum';

import { RoleEntity } from './role.entity';
import { UserServiceEntity } from './user-service.entity';
import { VisitEntity } from './visit.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  name: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Index()
  @Column('varchar', { length: 320, unique: true })
  email: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 20, nullable: true })
  fax: string;

  @Column({ nullable: true, select: false })
  password: string;

  @Column({ nullable: true })
  job: string;

  @Column()
  specialization: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  hasServiceAccess: boolean;

  @Column({ default: false })
  hasOnlineReception: boolean;

  @Column({ nullable: true, default: null, select: false })
  passwordResetToken: string;

  @ManyToOne(() => RoleEntity, (role) => role.user, {
    onDelete: 'SET NULL',
  })
  role: RoleEntity;

  @OneToMany(() => VisitEntity, (visit) => visit.user, {
    onDelete: 'SET NULL',
  })
  visit: VisitEntity[];

  @OneToMany(() => UserServiceEntity, (userService) => userService.user, {
    onDelete: 'SET NULL',
  })
  userService: UserServiceEntity[];

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
  })
  status: StatusEnum;

  @Column({
    type: 'enum',
    enum: GenderEnum,
    default: GenderEnum.MALE,
  })
  gender: GenderEnum;

  @Column({ nullable: true, type: 'timestamptz' })
  lastPasswordUpdate: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
