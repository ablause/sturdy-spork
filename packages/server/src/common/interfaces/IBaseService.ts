import { LeanDocumentOrArray } from 'mongoose';
import { QueryOptions } from './QueryOptions';

export interface IBaseService<M> {
  queryOptions: QueryOptions;
  findAll(options?: QueryOptions): Promise<LeanDocumentOrArray<M[]>>;
  findOne(id: string): Promise<LeanDocumentOrArray<M>>;
  create(input: Partial<M>): Promise<LeanDocumentOrArray<M>>;
  update(id: string, input: Partial<M>): Promise<LeanDocumentOrArray<M>>;
  delete(id: string): Promise<LeanDocumentOrArray<M>>;
}
