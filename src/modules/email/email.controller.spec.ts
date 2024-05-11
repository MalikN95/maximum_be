import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { EmailController } from './email.controller';
import { EmailService } from './email.service';

describe('EmailController', () => {
  const logger = new Logger('EmailController');
  let controller: EmailController;

  const mockEmailService = {};

  beforeEach(async () => {
    try {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [EmailController],
        providers: [EmailService],
      })
        .overrideProvider(EmailService)
        .useValue(mockEmailService)
        .compile();

      controller = module.get<EmailController>(EmailController);
    } catch (error) {
      logger.log('EmailController block occurred error', error);
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
