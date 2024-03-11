import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  // swagger setup
  @ApiProperty({
    description: 'Provide user email',
    required: true,
    type: String,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  // swagger setup
  @ApiProperty({
    description: 'Provide password',
    required: true,
    type: String,
  })
  password: string;
}
