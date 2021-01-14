import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';

import { CreateOrganizationDto, UpdateOrganizationDto } from './dtos';
import { OrganizationsService } from './organizations.service';
import { Organization } from './schemas/organization.schema';

@Resolver()
export class OrganizationsResolver {
  constructor(private readonly organizationService: OrganizationsService) {}

  @Query(() => Organization)
  async organization(@Args('_id') _id: string) {
    return this.organizationService.findOne(_id);
  }

  @Query(() => [Organization])
  async organizations(
    @Args('offset') offset: number,
    @Args('limit') limit: number,
  ) {
    return this.organizationService.findAll(offset, limit);
  }

  @Mutation(() => Organization)
  async createOrganization(
    @Args('input') input: CreateOrganizationDto,
    // @Context('pubSub') pubSub,
  ) {
    const createdOrganisation = await this.organizationService.create(input);
    // pubSub.publish('organisationCreated', {
    //   organisationCreated: createdOrganisation,
    // });
    return createdOrganisation;
  }

  @Mutation(() => Organization)
  async updateOrganization(
    @Args('_id') _id: string,
    @Args('input') input: UpdateOrganizationDto,
  ) {
    return await this.organizationService.update(_id, input);
  }

  @Mutation(() => Organization)
  async removeOrganisation(@Args('_id') _id: string) {
    return await this.organizationService.remove(_id);
  }
}
