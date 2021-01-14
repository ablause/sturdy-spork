import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsNotEmpty, IsString, IsEmail } from 'class-validator';

@InputType()
export class CreateCustomerDto {
  @Field()
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly firstName: string;

  @Field()
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly lastName: string;

  @Field()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Field()
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly phone: string;

  @Field()
  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  readonly address: string;

  @Field()
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly description: string;
}
