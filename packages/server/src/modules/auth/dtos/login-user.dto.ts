import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserDto {
  @Field()
  identifier: string;

  @Field()
  password: string;
}
