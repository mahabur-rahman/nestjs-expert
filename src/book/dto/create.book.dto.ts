import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsEmpty,
} from 'class-validator';
import { Category } from '../schemas/book.schema';
import { User } from '../../auth/schemas/user.schema';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly desc: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please enter correct category!' })
  readonly category: Category;

  @IsEmpty({ message: 'You can not pass user id...' })
  readonly user: User;
}
