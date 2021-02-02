import { QueryOptions as MongooseQueryOptions } from 'mongoose';

export type QueryOptions = Pick<MongooseQueryOptions, 'limit' | 'sort' | 'populate' | 'skip'> & {
  page?: number;
  select?: { [key: string]: 1 } | string;
};
