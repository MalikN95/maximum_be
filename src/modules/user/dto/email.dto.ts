import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailDto {
  @ApiProperty({
    description: 'Email',
    default: 'user@mail.maximum',
    required: false,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
