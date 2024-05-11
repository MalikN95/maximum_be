/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { GLOBAL_VALIDATION_ERR } from '@common/constants/shared.constant';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('CustomExceptionFilter');

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let { message } = exception as any;
    let validationMessage: string;

    if (status === 400) {
      message = exception.getResponse();
      validationMessage = message.message;
    }

    this.logger.error(
      status,
      exception,
      `${new Date().toISOString()} ${request.method} ${request.url}
      ${validationMessage || message || 'Internal server error'}`
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: validationMessage || message || 'Internal server error',
    });
  }
}
