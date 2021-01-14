import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
@ObjectType()
export class Customer extends Document {
  @Field(() => ID)
  _id: string;

  @Prop()
  @Field()
  firstName: string;

  @Prop()
  @Field()
  lastName: string;

  @Prop()
  @Field()
  email: string;

  @Prop()
  @Field()
  phone: string;

  @Prop()
  @Field()
  address: string;

  @Prop()
  @Field()
  description: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
