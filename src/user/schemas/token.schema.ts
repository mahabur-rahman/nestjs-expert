import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Token {
  @Prop()
  userId: string;

  @Prop()
  token: string;

  @Prop()
  expiredAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
