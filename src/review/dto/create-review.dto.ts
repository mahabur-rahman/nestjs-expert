import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/auth/schema/user.schema';
import { Product } from '../../product/schema/product.schema';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  ratings: string;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsEmpty({ message: 'You can not pass user id.' })
  readonly user: User;

  @IsNotEmpty()
  product: Product;
}
