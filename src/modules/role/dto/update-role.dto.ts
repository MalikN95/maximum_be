import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateRoleDto {
  @ApiPropertyOptional({
    description: 'Role name',
    default: 'Clerk',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  name?: string;

  @ApiPropertyOptional({
    description: 'Role description',
    default: 'Manager description',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  description?: string;

  @ApiPropertyOptional({
    description: 'Dashboard Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  dashboardAccess?: boolean;

  @ApiPropertyOptional({
    description: 'Payout Transaction Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  payoutTransaction?: boolean;

  @ApiPropertyOptional({
    description: 'Dashboard Sheets Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  dashboardSheetsAccess?: boolean;

  @ApiPropertyOptional({
    description: 'Submission Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  submissionAccess?: boolean;

  @ApiPropertyOptional({
    description: 'Todo Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  todoAccess?: boolean;

  @ApiPropertyOptional({
    description: 'Statistics Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  statisticsAccess?: boolean;

  @ApiPropertyOptional({
    description: 'Setting Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  settingAccess?: boolean;

  @ApiPropertyOptional({
    description: 'Logging Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  loggingAccess?: boolean;

  @ApiPropertyOptional({
    description: 'Users Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  usersAccess?: boolean;

  @ApiPropertyOptional({
    description: 'Roles Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  rolesAccess?: boolean;

  @ApiPropertyOptional({
    description: 'Lists Access',
    required: true,
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  listsAccess?: boolean;
}
