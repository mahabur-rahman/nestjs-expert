import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: [true, 'Duplicate email address found!'] })
  email: string;

  @Prop()
  password: string;


}

export const UserSchema = SchemaFactory.createForClass(User);
