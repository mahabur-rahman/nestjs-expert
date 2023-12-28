import {
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from 'src/auth/schema/user.schema';
import { Category } from 'src/category/schema/category.schema';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsArray()
  images: string[];

  @IsEmpty({ message: 'you can not pass user id.' })
  readonly user: User;

  @IsNotEmpty()
  readonly category: Category;
}
