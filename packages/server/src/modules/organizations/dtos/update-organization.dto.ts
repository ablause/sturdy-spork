import { InputType, PartialType } from '@nestjs/graphql';
import { CreateOrganizationDto } from './create-organization.dto';

@InputType()
export class UpdateOrganizationDto extends PartialType(
  CreateOrganizationDto,
  InputType,
) {}
