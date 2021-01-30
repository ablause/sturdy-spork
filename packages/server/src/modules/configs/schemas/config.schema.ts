import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document } from 'mongoose';

@Schema({ collection: 'configs' })
@ObjectType()
export class Config extends Document {
  @Field(() => ID)
  _id: string;

  @Prop()
  @Field()
  environment: string;

  @Prop({ enum: ['core', 'module'], default: 'core' })
  @Field({ defaultValue: 'core' })
  type: string;

  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  key: string;

  @Prop()
  @Field({ nullable: true })
  value: string;
}

export const ConfigSchema = SchemaFactory.createForClass(Config);
