import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class UserProfile extends Document {
  @Prop()
  @Field()
  firstName: string;

  @Prop()
  @Field()
  lastName: string;

  @Prop()
  @Field()
  phone: string;

  @Prop()
  @Field()
  email: string;

  @Prop()
  @Field()
  address: string;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
