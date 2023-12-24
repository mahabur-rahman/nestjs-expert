import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email address found!'] })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: [Roles.USER] })
  roles: Roles[];
}

export const UserSchema = SchemaFactory.createForClass(User);
