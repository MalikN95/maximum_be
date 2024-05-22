import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RoleDto {
  @ApiProperty({
    description: 'Role name',
    default: 'Clerk',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'Role description',
    default: 'Manager description',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  description: string;

  @ApiProperty({
    description: 'Dashboard Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  dashboardAccess: boolean;

  @ApiProperty({
    description: 'Dashboard Sheets Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  dashboardSheetsAccess: boolean;

  @ApiProperty({
    description: 'Submission Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  submissionAccess: boolean;

  @ApiProperty({
    description: 'Todo Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  todoAccess: boolean;

  @ApiProperty({
    description: 'Statistics Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  statisticsAccess: boolean;

  @ApiProperty({
    description: 'Setting Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  settingAccess: boolean;

  @ApiProperty({
    description: 'Logging Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  loggingAccess: boolean;

  @ApiProperty({
    description: 'Users Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  usersAccess: boolean;

  @ApiProperty({
    description: 'Roles Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  rolesAccess: boolean;

  @ApiProperty({
    description: 'Lists Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  listsAccess: boolean;

  @ApiProperty({
    description: 'Payout Transaction Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  payoutTransaction: boolean;
}
