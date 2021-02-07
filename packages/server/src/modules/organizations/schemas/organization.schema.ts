import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { LeanDocumentOrArray, Types } from 'mongoose';

import { BaseDocument } from 'common/base';

@Schema()
@ObjectType()
export class Organization extends BaseDocument {
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

export class IOrganization implements LeanDocumentOrArray<Organization> {
  _id: any;
  __v: any;
  id: string;
  name: string;
  address: string;
  description: string;
  users: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
