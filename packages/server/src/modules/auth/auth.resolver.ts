import { Args, Resolver, Context, Query } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import { IUser } from '~modules/users/interfaces/user.interface';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { LoginResult } from './interfaces/login-result.interface';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => LoginResult)
  async login(@Args('user') user: LoginUserDto): Promise<LoginResult> {
    const result = await this.authService.validateUser(user);

    if (!result) {
      throw new AuthenticationError(
        'Could not log-in with the provided credentials',
      );
    }

    return result;
  }

  @Query(() => String)
  // @UseGuards(JwtAuthGuard)
  async refreshToken(@Context('req') request: any): Promise<string> {
    const user: IUser = request.user;

    if (!user) {
      throw new AuthenticationError(
        'Could not log-in with the provided credentials',
      );
    }

    const result = await this.authService.createJwt(user);

    if (!result) {
      throw new AuthenticationError(
        'Could not log-in with the provided credentials',
      );
    }

    return result.token;
  }

  // @Subscription()
  // authCreated(@Context('pubSub') pubSub: any) {
  //   return pubSub.asyncIterator('userCreated');
  // }
}
