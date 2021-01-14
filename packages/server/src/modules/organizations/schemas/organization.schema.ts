import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document, Types } from 'mongoose';

@Schema()
@ObjectType()
export class Organization extends Document {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  address: string;

  @Prop({ required: true })
  @Field()
  description: string;

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  @Field({ nullable: true })
  users: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
