import { PipeTransform, Injectable, Logger } from '@nestjs/common';
import { Schema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  private logger = new Logger('ZodValidationPipe');

  constructor(private schema: Schema) {}

  transform<T>(value: T): T {
    this.schema.parse(value);

    return value;
  }
}
