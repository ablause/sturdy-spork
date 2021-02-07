import { InputType, Field } from '@nestjs/graphql';
import { QueryOptions } from 'common/interfaces';

@InputType()
class QueryOptionsArgs implements QueryOptions {
  @Field({ nullable: true })
  limit?: number = 20;

  @Field({ nullable: true })
  page?: number = 1;

  @Field({ nullable: true })
  skip?: number = 0;

  @Field({ nullable: true })
  populate?: string;

  @Field({ nullable: true })
  sort?: string;

  @Field({ nullable: true })
  select?: string;
}

export default QueryOptionsArgs;
