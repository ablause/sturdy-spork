import { InputType, Field } from '@nestjs/graphql';
import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsEmail,
  ValidateNested,
} from 'class-validator';

@InputType()
export class CreateUserProfile {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @Field()
  readonly firstName: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @Field()
  readonly lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Field()
  readonly email: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @Field()
  readonly phone: string;

  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  @Field()
  readonly address: string;
}

@InputType()
export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @Field()
  readonly identifier: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @Field()
  readonly password: string;

  @ValidateNested()
  @Field()
  readonly profile: CreateUserProfile;

  @IsString()
  @Field({ nullable: true })
  readonly organisation?: string;
}
