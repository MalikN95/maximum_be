import { RoleEntity } from '@entities/role.entity';

const admin: Partial<RoleEntity> = {
  name: 'Admin',
  description: 'Admin description',
  dashboardAccess: false,
  todoAccess: false,
  submissionAccess: false,
  reminderAccess: false,
  statisticsAccess: false,
  dataExport: false,
  settingAccess: true,
  usersAccess: true,
  rolesAccess: true,
  listsAccess: true,
  loggingAccess: true,
  payoutTransaction: false,
};
const manager: Partial<RoleEntity> = {
  name: 'Manager',
  description: 'Manager description',
  dashboardAccess: true,
  submissionAccess: true,
  todoAccess: true,
  reminderAccess: true,
  statisticsAccess: true,
  dataExport: true,
  settingAccess: true,
  usersAccess: false,
  rolesAccess: false,
  listsAccess: false,
  loggingAccess: true,
  payoutTransaction: true,
};

const clerk: Partial<RoleEntity> = {
  name: 'Clerk',
  description: 'Manager description',
  dashboardAccess: true,
  todoAccess: true,
  submissionAccess: true,
  reminderAccess: true,
  statisticsAccess: true,
  dataExport: true,
  settingAccess: true,
  usersAccess: false,
  rolesAccess: false,
  listsAccess: false,
  loggingAccess: false,
  payoutTransaction: false,
};

export const rolesSeed: Partial<RoleEntity>[] = [admin, manager, clerk];
