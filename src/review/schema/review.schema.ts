import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../auth/schema/user.schema';
import mongoose from 'mongoose';
import { Product } from '../../product/schema/product.schema';

@Schema({
  timestamps: true,
})
export class Review {
  @Prop()
  ratings: number;

  @Prop()
  comment: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User; // it refers user ID

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
