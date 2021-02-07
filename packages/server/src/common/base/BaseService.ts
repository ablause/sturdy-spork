import { Document, LeanDocumentOrArray, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException } from '@nestjs/common';

import { IBaseService, QueryOptions } from 'common/interfaces';

/**
 * @typeParam M  Mongoose Model for service.
 * @typeParam C  Dto for create model
 * @typeParam U  Dto for update model
 */
abstract class BaseService<M extends Document<M>, C = any, U = any> implements IBaseService<M> {
  // Default QueryOptions for finds
  abstract readonly queryOptions: QueryOptions = { limit: 20 };

  constructor(@InjectModel('') private model: Model<M>) {}

  public findAll({ page = 1, select, ...options }: QueryOptions): Promise<LeanDocumentOrArray<M[]>> {
    try {
      const query = this.model.find();

      const { populate, ...currentOptions } = Object.assign(this.queryOptions, options);

      query.setOptions(
        {
          ...currentOptions,
          skip: currentOptions.skip || Math.max(0, currentOptions.limit * page - currentOptions.limit),
        },
        false,
      );

      if (populate) query.populate(populate);
      if (select) query.select(select);

      return query.lean().exec();
    } catch (error) {
      throw new HttpException(error.message || error, error.status || 500);
    }
  }

  public async findOne(id: string): Promise<LeanDocumentOrArray<M>> {
    try {
      const result = await this.model.findById(id).lean().exec();

      if (!result) throw new HttpException('Not found', 404);

      return result;
    } catch (error) {
      throw new HttpException(error.message || error, error.status || 500);
    }
  }

  public async create(input: C): Promise<LeanDocumentOrArray<M>> {
    try {
      const query = new this.model(input);

      return (await query.save()).toObject() as LeanDocumentOrArray<M>;
    } catch (error) {
      throw new HttpException(error.message || error, error.status || 500);
    }
  }

  public async update(id: string, input: U): Promise<LeanDocumentOrArray<M>> {
    try {
      const result = await this.model.findByIdAndUpdate(id, input, { new: true }).lean();

      if (!result) throw new HttpException('Not found', 404);

      return result;
    } catch (error) {
      throw new HttpException(error.message || error, error.status || 500);
    }
  }

  public async delete(id: string): Promise<LeanDocumentOrArray<M>> {
    try {
      const result = await this.model.findByIdAndRemove(id).lean();

      return result;
    } catch (error) {
      throw new HttpException(error.message || error, error.status || 500);
    }
  }
}

export default BaseService;
