/* eslint-disable @darraghor/nestjs-typed/should-specify-forbid-unknown-values */
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { HttpExceptionFilter } from '@common/utils/global.exception';

import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;

const logger = new Logger('Main');

async function bootstrap(): Promise<void> {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      })
    );
    app.useGlobalFilters(new HttpExceptionFilter());

    app.enableCors();

    const config = new DocumentBuilder()
      .setTitle('maximum')
      .setDescription('maximum Routes Documentation')
      .setVersion('1.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      })
      .addSecurityRequirements('bearer')
      .build();
    const document = SwaggerModule.createDocument(app, config);

    if (process.env.ENABLE_API === 'true')
      SwaggerModule.setup('api', app, document);

    await app.listen(PORT);
  } catch (error) {
    logger.error(error);
  }
}
bootstrap()
  .then(() => logger.verbose('the server is running on port ' + PORT))
  .catch((error) => logger.error('the server crashed with an error:', error));
