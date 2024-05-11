import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { EmailController } from './email.controller';
import { EmailService } from './email.service';

describe('EmailService', () => {
  const logger = new Logger('EmailService');
  let emailService: EmailService;

  const mockEmailService = {};

  beforeEach(async () => {
    try {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [EmailController],
        providers: [EmailService, ConfigService],
      })
        .overrideProvider(EmailService)
        .useValue(mockEmailService)
        .compile();

      emailService = module.get<EmailService>(EmailService);
    } catch (error) {
      logger.log('EmailService block occurred error', error);
    }
  });

  it('should be defined', () => {
    expect(emailService).toBeDefined();
  });
});
