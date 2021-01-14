import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

import {
  UserPasswordReset,
  UserPasswordResetSchema,
} from './userPasswordReset.schema';
import { UserProfile, UserProfileSchema } from './userProfile.schema';

@Schema({ timestamps: true })
@ObjectType()
export class User extends Document {
  @Field(() => ID)
  _id: string;

  @Prop({ unique: true })
  @Field()
  identifier: string;

  @Prop()
  @Field()
  password: string;

  @Prop({ type: UserProfileSchema })
  @Field()
  profile: UserProfile;

  @Prop({ default: true })
  @Field()
  enabled: boolean;

  @Prop()
  @Field()
  permissions: string;

  @Prop({ type: UserPasswordResetSchema })
  @Field(() => UserPasswordReset)
  passwordReset: UserPasswordReset;

  @Prop({ type: Date, default: Date.now })
  @Field(() => Date)
  lastSeenAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'Organisation' })
  @Field()
  organisation: string;

  async hashingPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async checkPassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
