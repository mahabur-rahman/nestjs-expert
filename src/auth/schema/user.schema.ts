import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/category/schema/category.schema';

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email address found!'] })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: [Roles.USER] })
  roles: Roles[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }])
  categories: Category[];
}

export const UserSchema = SchemaFactory.createForClass(User);
