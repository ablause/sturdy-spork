import { Field, ID } from '@nestjs/graphql';
import { Document } from 'mongoose';

abstract class BaseDocument<T = any> extends Document<T> {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  _id: any;

  // @Field()
  // __v: any;
}

export default BaseDocument;
