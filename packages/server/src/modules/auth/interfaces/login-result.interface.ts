import { Field, InterfaceType } from '@nestjs/graphql';
import { User } from '~modules/users/schemas/user.schema';

@InterfaceType()
export class LoginResult {
  @Field()
  user: User;

  @Field()
  token: string;
}
