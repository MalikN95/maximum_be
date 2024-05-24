import { randomUUID } from 'crypto';

import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash, hashSync } from 'bcrypt';
import { EntityManager, Repository } from 'typeorm';

import { PaginationDto } from '@common/dto/pagination.dto';
import { SearchDto } from '@common/dto/search.dto';
import { UserSortEnum } from '@common/enums/user-sort.enum';
import { PaginationResult } from '@common/interfaces/pagination-res.interface';
import { generateRandomCode } from '@common/utils/main';
import { RoleEntity } from '@entities/role.entity';
import { UserEntity } from '@entities/user.entity';
import { EMAIL_IS_USE } from '@modules/auth/auth.constants';
import { EmailService } from '@modules/email/email.service';
import { FilesService } from '@modules/files/files.service';

import { EmailDto } from './dto/email.dto';
import { ProfileDto } from './dto/profile.dto';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { RegisterDto } from './dto/register.dto';
import { UserSortDto } from './dto/sort.dto';
import { StatusDto } from './dto/status.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import {
  EMAIL_ALREADY_USED,
  EMAIL_NOT_EXIST,
  INCORRECT_PASSWORD,
  LINK_ALREADY_USE,
  SEND_PASSWORD_RESET_EMAIL,
  SUCCESSFULLY_DELETE_USER,
  SUCCESSFULLY_PASSWORD_RESET,
  USER_FOLDER,
  USER_NOT_FOUND,
} from './user.constants';

@Injectable()
export class UserService {
  constructor(
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    private readonly fileService: FilesService,

    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>
  ) {}

  async sendToken(emailDto: EmailDto): Promise<{ message: string }> {
    const { email } = emailDto;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new NotFoundException(EMAIL_NOT_EXIST);
    }

    const newToken = randomUUID();

    await this.userRepository
      .createQueryBuilder('user')
      .update()
      .set({ passwordResetToken: newToken })
      .where('id = :id', { id: user.id })
      .execute();

    await this.emailService.sendPasswordResetMail(user.email, newToken);

    return {
      message: SEND_PASSWORD_RESET_EMAIL,
    };
  }

  async createUser(
    // admin: UserEntity,
    registerDto: RegisterDto,
    file: Express.Multer.File
  ): Promise<UserEntity> {
    const { email, ...data } = registerDto;

    console.log(registerDto, file);

    const upload: { key: string } = file
      ? await this.fileService.uploadFile(file, USER_FOLDER)
      : undefined;

    await this.credentialsValidation(registerDto);

    const newToken = randomUUID();

    const user = await this.userRepository
      .createQueryBuilder('user')
      .insert()
      .into(UserEntity)
      .values({
        ...data,
        email: email.toLowerCase(),
        passwordResetToken: newToken,
        photoUrl: file ? upload?.key : undefined,
        // role: { id: roleId },
      })
      .orIgnore()
      .returning('*')
      .execute()
      .then<UserEntity>((result) => result.raw[0]);

    if (!user) throw new ForbiddenException(EMAIL_IS_USE);

    // await this.emailService.sendAccountCreateMail(email, newToken);

    return user;
  }

  async getUserList(
    paginationDto: PaginationDto,
    searchDto: SearchDto,
    userSortDto: UserSortDto
  ): Promise<PaginationResult<UserEntity>> {
    const { skipPages, pageSize } = paginationDto;
    const { searchValue } = searchDto;
    const { order, sort, role, statuses } = userSortDto;

    const sortValue = this.createUserSortValue(sort);

    let searchWords: string[];

    if (searchValue)
      searchWords = searchValue
        .trim()
        .split(' ')
        .map((keyword) => `%${keyword}%`);

    const [result, total] = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where(
        searchValue
          ? `( 
              user.name ILIKE ANY(:searchValue) OR 
              user.email ILIKE ANY(:searchValue)
            )`
          : 'true = true',
        {
          searchValue: searchWords,
        }
      )
      .andWhere(statuses ? `user.status IN (:...statuses)` : 'true = true', {
        statuses: statuses ? JSON.parse(statuses) : [],
      })
      .andWhere(role ? `role.name = :role` : 'true = true', {
        role,
      })
      .skip(pageSize * skipPages)
      .take(pageSize)
      .orderBy(sortValue, `${order}`)
      .getManyAndCount();

    return {
      data: result,
      count: total,
    };
  }

  createUserSortValue(sort: UserSortEnum): string {
    if (sort === UserSortEnum.NAME) {
      return 'user.name';
    }

    if (sort === UserSortEnum.STATUS) {
      return 'user.status';
    }

    return 'role.name';
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.name'])
      .getMany();

    return users;
  }

  async recoverPassword(
    recoverPasswordDto: RecoverPasswordDto
  ): Promise<{ message: string }> {
    const { newPassword, token } = recoverPasswordDto;

    const salt = await genSalt(
      Number(this.configService.get<number>('SALT_VALUE'))
    );

    const updateUser = await this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        passwordResetToken: null,
        password: await hash(newPassword, salt),
        lastPasswordUpdate: new Date(),
      })
      .where('passwordResetToken = :token', { token })
      .returning('*')
      .execute()
      .then<UserEntity>((result) => result.raw[0]);

    if (!updateUser) {
      throw new NotFoundException(LINK_ALREADY_USE);
    }

    return {
      message: SUCCESSFULLY_PASSWORD_RESET,
    };
  }

  async deleteUser(user: UserEntity): Promise<{ message: string }> {
    const { id } = user;

    const checkUser = await this.userRepository
      .createQueryBuilder('user')
      .delete()
      .from(UserEntity)
      .where('id = :id', { id })
      .returning('*')
      .execute()
      .then<UserEntity>((result) => result.raw[0]);

    if (!checkUser) throw new NotFoundException();

    return {
      message: SUCCESSFULLY_DELETE_USER,
    };
  }

  async deleteUserById(
    user: UserEntity,
    id: string
  ): Promise<{ message: string }> {
    const checkUser = await this.userRepository
      .createQueryBuilder('user')
      .delete()
      .from(UserEntity)
      .where('id = :id', { id })
      .andWhere('isAdmin = false')
      .returning('*')
      .execute()
      .then<UserEntity>((result) => result.raw[0]);

    if (!checkUser) throw new NotFoundException();

    return {
      message: SUCCESSFULLY_DELETE_USER,
    };
  }

  async updateUserStatus(
    userId: string,
    statusDto: StatusDto
  ): Promise<UserEntity> {
    const { status } = statusDto;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .update(UserEntity)
      .set({
        status,
      })
      .where('id = :userId', { userId })
      .returning('*')
      .execute()
      .then<UserEntity>((result) => result.raw[0]);

    if (!user) throw new UnauthorizedException(USER_NOT_FOUND);

    delete user.password;

    return user;
  }

  async inviteUser(userId: string): Promise<boolean> {
    const checkAccess = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .getOne();

    if (checkAccess.hasServiceAccess) return true;

    const salt = await genSalt(
      Number(this.configService.get<number>('SALT_VALUE'))
    );

    const newPassword = generateRandomCode(8);

    const user = await this.userRepository
      .createQueryBuilder('user')
      .update(UserEntity)
      .set({
        hasServiceAccess: true,
        password: hashSync(newPassword, salt),
      })
      .where('id = :userId', { userId })
      .returning('*')
      .execute()
      .then<UserEntity>((result) => result.raw[0]);

    if (!user) throw new UnauthorizedException(USER_NOT_FOUND);

    await this.emailService.sendInviteMail(user.email, newPassword);

    return true;
  }

  async getUser(userId: string): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('id = :userId', { userId })
      .getOne();

    if (!user) throw new UnauthorizedException(USER_NOT_FOUND);

    delete user.password;

    return user;
  }

  async updateProfile(
    id: string,
    profileDto: ProfileDto
    // user: UserEntity
  ): Promise<UserEntity> {
    await this.emailValidation(profileDto.email, id);
    if (profileDto.hasServiceAccess) await this.inviteUser(id);

    const userProfile = await this.userRepository
      .createQueryBuilder('user')
      .update(UserEntity)
      .set(profileDto)
      .where('id = :id', { id })
      .returning('*')
      .execute()
      .then<UserEntity>((result) => result.raw[0]);

    if (!userProfile) throw new ForbiddenException(USER_NOT_FOUND);

    return userProfile;
  }

  async getProfile(user: UserEntity): Promise<UserEntity> {
    const { id } = user;
    const userProfile = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.role', 'role')
      .getOne();

    return userProfile;
  }

  async updateProfilePassword(
    user: UserEntity,
    updatePasswordDto: UpdatePasswordDto
  ): Promise<UserEntity> {
    const { id } = user;
    const { oldPassword, newPassword } = updatePasswordDto;
    const salt = await genSalt(
      Number(this.configService.get<number>('SALT_VALUE'))
    );

    const checkUserPassword = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .addSelect(['user.password'])
      .getOne();

    const isCorrectPassword = await compare(
      oldPassword,
      checkUserPassword.password
    );

    if (!isCorrectPassword) {
      throw new ForbiddenException(INCORRECT_PASSWORD);
    }

    const updateUser = await this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        password: await hash(newPassword, salt),
        lastPasswordUpdate: new Date(),
      })
      .returning('*')
      .where('id = :id', { id })
      .execute()
      .then<UserEntity>((result) => result.raw[0]);

    return updateUser;
  }

  async credentialsValidation(registerDto: RegisterDto): Promise<void> {
    const { email } = registerDto;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .orWhere('user.email = :email', { email })
      .getOne();

    if (!user) return;

    if (user) throw new ForbiddenException(EMAIL_ALREADY_USED);
  }

  async emailValidation(email: string, id: string): Promise<void> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .andWhere('user.id != :id', { id })
      .getOne();

    if (user) throw new ForbiddenException(EMAIL_IS_USE);
  }
}
