import { Args, Resolver, Query, Context, Mutation } from '@nestjs/graphql';

import { CurrentUser } from 'common/decorators/current-user.decorator';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => User)
  async me(@CurrentUser() user: User) {
    return user;
  }

  @Query(() => User)
  async user(@Args('_id') _id: string) {
    return this.userService.findOne(_id);
  }

  @Query(() => [User])
  async users(@Args('offset') offset: number, @Args('limit') limit: number) {
    return this.userService.findAll(offset, limit);
  }

  @Mutation(() => User, { name: 'register' })
  async createUser(@Args('input') input: CreateUserDto, @Context('pubSub') pubSub: any) {
    const createdUser = await this.userService.create(input);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Mutation(() => User)
  async updateUser(@Args('_id') _id: string, @Args('input') input: UpdateUserDto) {
    return await this.userService.update(_id, input);
  }

  @Mutation(() => User)
  async removeUser(@Args('_id') _id: string) {
    return await this.userService.remove(_id);
  }
}
