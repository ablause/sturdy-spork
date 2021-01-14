import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCustomerDto } from './create-customer.dto';

@InputType()
export class UpdateCustomerDto extends PartialType(
  CreateCustomerDto,
  InputType,
) {}
