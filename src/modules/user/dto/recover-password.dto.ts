import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RecoverPasswordDto {
  @Length(6, 20)
  @ApiProperty({
    description: 'New password of the user, has 8 to 20 characters',
    example: 'Abc$12345',
  })
  newPassword: string;

  @ApiProperty({
    description: 'Reset token',
    example: '585230a5-0f59-4dff-9330-ac076d43dc25',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
