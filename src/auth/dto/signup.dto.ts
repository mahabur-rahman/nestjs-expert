import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  // swagger setup
  @ApiProperty({
    description: 'Provide user name',
    required: true,
    type: String,
  })
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: `Please enter correct email!` })
  // swagger setup
  @ApiProperty({
    description: 'Provide valid email',
    required: true,
    type: String,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  // swagger setup
  @ApiProperty({
    description: 'Provide 6 characters password',
    required: true,
    type: String,
  })
  password: string;
}
