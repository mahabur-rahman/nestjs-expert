import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
import { Category } from 'src/category/schema/category.schema';

@Schema({
  timestamps: true,
})
export class Product {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  stock: number;

  @Prop()
  images: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User; //it refers user ID

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category; // it refers category ID

  // @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }])
  // reviews: Review[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
