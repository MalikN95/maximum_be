import { RoleEntity } from '@entities/role.entity';

export type TokenPayload = {
  id: string;
  email: string;
  name: string;
  needPasswordChange?: boolean;
  passwordChangeLastDay?: Date;
  isAdmin?: boolean;
  role: RoleEntity;
  phone: string;
  fax: string;
  iat?: number;
  exp?: number;
};
