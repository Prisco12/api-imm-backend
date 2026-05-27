import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {

  @Prop({required: true})
  name: string;

  @Prop({required: true, unique: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop()
  refreshToken: string;

  @Prop()
  role: string;

  @Prop()
  active: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);