import { GenderEnum } from '@common/enums/gender.enum';
import { StatusEnum } from '@common/enums/status.enum';

interface User {
  name: string;
  email: string;
  password: string;
  phone: string;
  fax: string;
  gender?: GenderEnum;
  status?: StatusEnum;
  lastPasswordUpdate: Date;
  role?: { id: string };
  specialization: string;
}

const user1 = {
  name: 'User 1',
  email: 'user@mail.maximum',
  password: 'Abc$12345',
  phone: '+46-(123)-456-78-90',
  fax: '+46-(123)-456-78-91',
  isAdmin: true,
  gender: GenderEnum.MALE,
  lastPasswordUpdate: new Date(),
  specialization: 'Стоматолог',
};

const user2 = {
  name: 'User 2',
  email: 'user2@mail.maximum',
  password: 'Abc$12345',
  phone: '+46-(123)-456-78-91',
  fax: '+46-(123)-456-78-91',
  gender: GenderEnum.FEMALE,
  lastPasswordUpdate: new Date(),
  specialization: 'Стоматолог',
};

const user3 = {
  name: 'User 3',
  email: 'user3@mail.com',
  password: 'Abc$12345',
  phone: '+46-(123)-456-78-92',
  fax: '+46-(123)-456-78-91',
  gender: GenderEnum.OTHER,
  lastPasswordUpdate: new Date(),
  specialization: 'Ортопедия',
};

export const usersSeed: User[] = [user1, user2, user3];
