import { Logger as NestLogger } from '@nestjs/common';
import { Logger as TypeOrmLogger } from 'typeorm';

class DatabaseLogger implements TypeOrmLogger {
  private readonly logger = new NestLogger('SQL');

  logQuery(query: string, parameters?: unknown[]): void {
    this.logger.log(
      `${query} -- Parameters: ${this.stringifyParameters(parameters)}`
    );
  }

  logQueryError(error: string, query: string, parameters?: unknown[]): void {
    this.logger.error(
      `${query} -- Parameters: ${this.stringifyParameters(
        parameters
      )} -- ${error}`
    );
  }

  logQuerySlow(time: number, query: string, parameters?: unknown[]): void {
    this.logger.warn(
      `Time: ${time}ms -- Parameters: ${this.stringifyParameters(
        parameters
      )} -- ${query}`
    );
  }

  logMigration(message: string): void {
    this.logger.log(message);
  }

  logSchemaBuild(message: string): void {
    this.logger.log(message);
  }

  log(level: 'log' | 'info' | 'warn', message: string): void {
    if (level === 'log') {
      return this.logger.log(message);
    }
    if (level === 'info') {
      return this.logger.debug(message);
    }
    if (level === 'warn') {
      return this.logger.warn(message);
    }
  }

  private stringifyParameters(parameters?: unknown[]): string {
    try {
      return JSON.stringify(parameters);
    } catch {
      return '';
    }
  }
}

export default DatabaseLogger;
