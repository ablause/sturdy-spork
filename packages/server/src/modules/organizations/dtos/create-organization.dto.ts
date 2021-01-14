import { InputType, Field } from '@nestjs/graphql';
import { MaxLength, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateOrganizationDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  readonly address: string;

  @Field()
  @IsString()
  @MaxLength(50)
  readonly description: string;

  @Field({ nullable: true })
  @IsString()
  readonly users?: string;
}
