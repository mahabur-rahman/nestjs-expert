import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/auth/schema/user.schema';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEmpty({ message: 'You can not pass user id.' })
  readonly user: User;
}
