import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { EnumRoleUser } from '../enum/user-role';

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

  @Prop({required: true, enum: EnumRoleUser, default: EnumRoleUser.User})
  role: EnumRoleUser;

  @Prop({required: true, default: true})
  active: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);