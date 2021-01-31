import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateCustomerDto, UpdateCustomerDto } from './dtos';
import { ICustomer } from './interfaces/customer.interface';
import { Customer } from './schemas/customer.schema';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {}

  public async findAll(offset: number, limit: number) {
    return await this.customerModel
      .find()
      .skip(offset)
      .limit(limit)
      .populate('organisation')
      .exec();
  }

  public async findOne(_id: string): Promise<Customer> {
    const customer = await this.customerModel
      .findById({ _id })
      .populate('customer')
      .exec();

    if (!customer) {
      throw new NotFoundException(`Customer #${_id} not found`);
    }

    return customer;
  }

  public async create(input: CreateCustomerDto): Promise<ICustomer> {
    const newCustomer = await new this.customerModel(input);
    return newCustomer.save();
  }

  public async update(
    _id: string,
    input: UpdateCustomerDto,
  ): Promise<ICustomer> {
    const existingCustomer = this.customerModel.findByIdAndUpdate(_id, input, {
      new: true,
    });

    if (!existingCustomer) {
      throw new NotFoundException(`Customer #${_id} not found`);
    }

    return existingCustomer;
  }

  public async remove(_id: string): Promise<unknown> {
    const deletedCustomer = await this.customerModel.findByIdAndRemove(_id);

    return deletedCustomer;
  }
}
