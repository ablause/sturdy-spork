import { Args, Resolver, Query, Context, Mutation } from '@nestjs/graphql';

import { CreateCustomerDto, UpdateCustomerDto } from './dtos';
import { CustomersService } from './customers.service';
import { Customer } from './schemas/customer.schema';

@Resolver()
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) {}

  @Query(() => Customer)
  async customer(@Args('_id') _id: string) {
    return this.customersService.findOne(_id);
  }

  @Query(() => [Customer])
  async customers(
    @Args('offset') offset: number,
    @Args('limit') limit: number,
  ) {
    return this.customersService.findAll(offset, limit);
  }

  @Mutation(() => Customer)
  async createCustomer(
    @Args('input') input: CreateCustomerDto,
    @Context('pubSub') pubSub,
  ) {
    const createdCustomer = await this.customersService.create(input);
    pubSub.publish('customerCreated', { customerCreated: createdCustomer });
    return createdCustomer;
  }

  @Mutation(() => Customer)
  async updateCustomer(
    @Args('_id') _id: string,
    @Args('input') input: UpdateCustomerDto,
  ) {
    return await this.customersService.update(_id, input);
  }

  @Mutation(() => Customer)
  async removeCustomer(@Args('_id') _id: string) {
    return this.customersService.remove(_id);
  }
}
