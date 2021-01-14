import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
@ObjectType()
export class UserPasswordReset extends Document {
  @Prop({ required: true })
  @Field()
  token: string;

  @Prop({ Required: true })
  @Field()
  expiration: Date;
}

export const UserPasswordResetSchema = SchemaFactory.createForClass(
  UserPasswordReset,
);
