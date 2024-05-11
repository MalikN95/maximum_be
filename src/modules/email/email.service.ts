import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

import {
  ACCOUNT_CREATED,
  PASSWORD_RESET_EMAIL_TITLE,
  PROJECT_NAME,
  accountCreateEmail,
  passwordResetEmail,
  sendInviteMail,
} from './email.constants';

@Injectable()
export class EmailService {
  private logger = new Logger('EventsService');

  constructor(private configService: ConfigService) {}

  private transporter = createTransport({
    host: this.configService.get<string>('MAIL_HOST'),
    port: Number(this.configService.get<number>('MAIL_PORT')),
    secure: this.configService.get<string>('MAIL_SECURE') === 'true',
    auth: {
      user: this.configService.get<string>('SENDER_MAIL'),
      pass: this.configService.get<string>('SENDER_PASSWORD'),
    },
  });

  async sendPasswordResetMail(email: string, newToken: string): Promise<void> {
    await this.transporter.sendMail({
      from: `${PROJECT_NAME} <${this.configService.get<string>('SENDER')}>`,
      to: `${email}`,
      subject: PASSWORD_RESET_EMAIL_TITLE,
      html: passwordResetEmail(newToken),
    });
  }

  async sendInviteMail(email: string, password: string): Promise<void> {
    await this.transporter.sendMail({
      from: `${PROJECT_NAME} <${this.configService.get<string>('SENDER')}>`,
      to: `${email}`,
      subject: ACCOUNT_CREATED,
      html: sendInviteMail(password),
    });
  }

  async sendAccountCreateMail(email: string, newToken: string): Promise<void> {
    await this.transporter.sendMail({
      from: `${PROJECT_NAME} <${this.configService.get<string>('SENDER')}>`,
      to: `${email}`,
      subject: ACCOUNT_CREATED,
      html: accountCreateEmail(email, newToken),
    });
  }
}
