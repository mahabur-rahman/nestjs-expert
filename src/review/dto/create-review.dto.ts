import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/auth/schema/user.schema';
import { Product } from 'src/product/schema/product.schema';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  ratings: string;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsEmpty({ message: 'You can not pass user id.' })
  readonly user: User;

  @IsNotEmpty()
  @IsString()
  product: Product;
}
