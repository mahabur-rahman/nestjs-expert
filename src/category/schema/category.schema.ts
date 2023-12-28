import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

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

  @Prop({ type: [{ type: 'ObjectId', ref: 'Product' }] })
  products: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
