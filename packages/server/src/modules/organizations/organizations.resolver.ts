import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';

import { QueryOptionsArgs } from '@common/dtos';
import { CreateOrganizationDto, UpdateOrganizationDto } from './dtos';
import { OrganizationsService } from './organizations.service';
import { Organization } from './schemas/organization.schema';

@Resolver(() => Organization)
export class OrganizationsResolver {
  constructor(private readonly organizationService: OrganizationsService) {}

  @Query(() => Organization)
  async organization(@Args('id') id: string) {
    return this.organizationService.findOne(id);
  }

  @Query(() => [Organization])
  async organizations(@Args('options') options: QueryOptionsArgs) {
    return this.organizationService.findAll(options);
  }

  @Mutation(() => Organization)
  async createOrganization(@Args('input') input: CreateOrganizationDto) {
    const createdOrganization = await this.organizationService.create(input);
    return createdOrganization;
  }

  @Mutation(() => Organization)
  async updateOrganization(@Args('id') id: string, @Args('input') input: UpdateOrganizationDto) {
    return await this.organizationService.update(id, input);
  }

  @Mutation(() => Organization)
  async deleteOrganization(@Args('id') id: string) {
    return await this.organizationService.delete(id);
  }
}
