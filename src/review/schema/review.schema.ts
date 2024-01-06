import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
import { Product } from 'src/product/schema/product.schema';

@Schema({
  timestamps: true,
})
export class Review {
  @Prop()
  ratings: string;

  @Prop()
  comment: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User; //it refers user ID

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
