import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiResponse,
  ApiOkResponse,
  ApiTags,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';

import { GetUser } from '@common/decorators/user.decorator';
import { PaginationDto } from '@common/dto/pagination.dto';
import { PaginationResult } from '@common/interfaces/pagination-res.interface';
import { RoleEntity } from '@entities/role.entity';
import { UserEntity } from '@entities/user.entity';

import { RoleSortDto } from './dto/role-sort.dto';
import { RoleDto } from './dto/role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleService } from './role.service';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('list')
  @ApiResponse({ status: 200, type: RoleEntity })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOkResponse({
    description: 'Api response',
    type: RoleEntity,
  })
  @ApiOperation({
    summary: 'Get roles with pagination',
  })
  @UseGuards(AuthGuard('jwt'))
  getRoleList(
    @Query() paginationDto: PaginationDto,
    @Query() roleSortDto: RoleSortDto
  ): Promise<PaginationResult<RoleEntity>> {
    return this.roleService.getRoleList(paginationDto, roleSortDto);
  }

  @Get('all')
  @ApiResponse({ status: 200, type: RoleEntity })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOperation({
    summary: 'Get all roles array',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'Api response',
    type: RoleEntity,
  })
  getAllRoles(): Promise<RoleEntity[]> {
    return this.roleService.getAllRole();
  }

  @Post()
  @ApiResponse({ status: 200, type: RoleEntity })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOperation({
    summary: 'Create new role',
  })
  @UseGuards(AuthGuard('jwt'))
  createRole(@Body() roleDto: RoleDto): Promise<RoleEntity> {
    return this.roleService.createRole(roleDto);
  }

  @Patch('by-id/:id')
  @ApiResponse({ status: 200, type: RoleEntity })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOperation({
    summary: 'Update role by id',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Role id',
  })
  updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto
  ): Promise<RoleEntity> {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Delete('by-id/:id')
  @ApiResponse({ status: 200, type: RoleEntity })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOperation({
    summary: 'Delete role by id',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Role id',
  })
  deleteRoleById(
    @Param('id') id: string,
    @GetUser() user: UserEntity
  ): Promise<RoleEntity> {
    return this.roleService.deleteRoleById(id, user);
  }
}
