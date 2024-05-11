import {
  Controller,
  Patch,
  Post,
  Body,
  Delete,
  UseGuards,
  Get,
  Param,
  Query,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiResponse,
  ApiOkResponse,
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';

import { GetUser } from '@common/decorators/user.decorator';
import { PaginationDto } from '@common/dto/pagination.dto';
import { SearchDto } from '@common/dto/search.dto';
import { PaginationResult } from '@common/interfaces/pagination-res.interface';
import { UserEntity } from '@entities/user.entity';
import { RecoverPasswordDto } from '@modules/user/dto/recover-password.dto';
import { UserService } from '@modules/user/user.service';

import { EmailDto } from './dto/email.dto';
import { ProfileDto } from './dto/profile.dto';
import { RegisterDto } from './dto/register.dto';
import { UserSortDto } from './dto/sort.dto';
import { StatusDto } from './dto/status.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { IMAGE_MIMETYPE } from '@common/constants/shared.constant';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('token-info')
  @ApiResponse({ status: 200, type: String })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOperation({
    summary: 'Get jet token info, for development',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'Api response',
    type: UserEntity,
  })
  tokenInfo(@GetUser() user: UserEntity): UserEntity {
    return user;
  }

  @Post()
  @ApiResponse({ status: 200, type: UserEntity })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOperation({
    summary: 'Create new user',
    description: 'Create new user and return, return with role',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('img'))
  @UseGuards(AuthGuard('jwt'))
  register(
    @GetUser() user: UserEntity,
    @Body() registerDto: RegisterDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: IMAGE_MIMETYPE,
          }),
        ],
        fileIsRequired: false,
      })
    )
    file: Express.Multer.File
  ): Promise<UserEntity> {
    return this.userService.createUser(registerDto, file);
  }

  @Get('list')
  @ApiResponse({ status: 200, type: UserEntity })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'Api response',
    type: UserEntity,
  })
  getUserList(
    @Query() paginationDto: PaginationDto,
    @Query() searchDto: SearchDto,
    @Query() userSortDto: UserSortDto
  ): Promise<PaginationResult<UserEntity>> {
    return this.userService.getUserList(paginationDto, searchDto, userSortDto);
  }

  @Get('all')
  @ApiResponse({ status: 200, type: UserEntity })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'Api response',
    type: UserEntity,
  })
  getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUsers();
  }

  @Patch('password-reset-token')
  @ApiResponse({ status: 200, type: Object })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  sendToken(@Body() emailDto: EmailDto): Promise<{ message: string }> {
    return this.userService.sendToken(emailDto);
  }

  @Patch('user-status/:id')
  @ApiResponse({ status: 200, type: Object })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'User id',
  })
  updateUserStatus(
    @Param('id') id: string,
    @Body() statusDto: StatusDto
  ): Promise<UserEntity> {
    return this.userService.updateUserStatus(id, statusDto);
  }

  @Get('invite/:id')
  @ApiResponse({ status: 200, type: Object })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  // @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'User id',
  })
  inviteUser(@Param('id') id: string): Promise<boolean> {
    return this.userService.inviteUser(id);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Object })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'User id',
  })
  getUser(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.getUser(id);
  }

  @Post('recover-password')
  @ApiResponse({ status: 200, type: Object })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  recoverPassword(
    @Body() recoverPasswordDto: RecoverPasswordDto
  ): Promise<{ message: string }> {
    return this.userService.recoverPassword(recoverPasswordDto);
  }

  @Delete('delete-user')
  @ApiResponse({ status: 200, type: String })
  @UseGuards(AuthGuard('jwt'))
  @ApiBadRequestResponse({ description: 'Bad Request' })
  deleteUser(@GetUser() user: UserEntity): Promise<{ message: string }> {
    return this.userService.deleteUser(user);
  }

  @Delete('by-id/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, type: String })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'User id',
  })
  deleteUserById(
    @GetUser() user: UserEntity,
    @Param('id') id: string
  ): Promise<{ message: string }> {
    return this.userService.deleteUserById(user, id);
  }

  @Patch('by-id/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, type: String })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'User id',
  })
  updateProfile(
    @Body() profileDto: ProfileDto,
    @Param('id') id: string
  ): Promise<UserEntity> {
    return this.userService.updateProfile(id, profileDto);
  }

  @Get('profile')
  @ApiResponse({ status: 200, type: UserEntity })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'Api response',
    type: UserEntity,
  })
  getProfile(@GetUser() user: UserEntity): Promise<UserEntity> {
    return this.userService.getProfile(user);
  }

  @Patch('password')
  @ApiResponse({ status: 200, type: String })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(AuthGuard('jwt'))
  updateProfilePassword(
    @GetUser() user: UserEntity,
    @Body() updatePasswordDto: UpdatePasswordDto
  ): Promise<UserEntity> {
    return this.userService.updateProfilePassword(user, updatePasswordDto);
  }
}
