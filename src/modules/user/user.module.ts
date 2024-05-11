import { Module } from '@nestjs/common/decorators';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleEntity } from '@entities/role.entity';
import { UserEntity } from '@entities/user.entity';
import { EmailService } from '@modules/email/email.service';
import { UserController } from '@modules/user/user.controller';
import { UserService } from '@modules/user/user.service';
import { FilesService } from '@modules/files/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  providers: [UserService, EmailService, FilesService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
