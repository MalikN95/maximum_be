import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dataSource } from '@config/conf';
import { AuthModule } from '@modules/auth/auth.module';
import { EmailModule } from '@modules/email/email.module';
import { UserModule } from '@modules/user/user.module';

import { SeedsModule } from './modules/seeds/seeds.module';
import { CustomerModule } from './modules/customer/customer.module';
import { FilesService } from '@modules/files/files.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: dataSource,
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    EmailModule,
    SeedsModule,
    CustomerModule,
  ],
  providers: [FilesService],
  controllers: [],
})
export class AppModule {}
