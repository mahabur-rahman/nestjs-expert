import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Reset {
  @Prop()
  email: string;

  @Prop({ unique: true })
  token: string;
}

export const ResetSchema = SchemaFactory.createForClass(Reset);
