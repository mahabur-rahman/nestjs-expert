import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
import { Product } from 'src/product/schema/product.schema';

@Schema({
  timestamps: true,
})
export class Category {
  @Prop()
  title: string;

  @Prop()
  description: string;

  //   @Prop()  if want full user document
  //   user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User; //it refers user ID

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  products: Product[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
