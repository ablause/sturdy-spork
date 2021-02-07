import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateOrganizationDto, UpdateOrganizationDto } from './dtos';
import { Organization } from './schemas/organization.schema';
import { BaseService } from '../../common/base';

@Injectable()
export class OrganizationsService extends BaseService<Organization, CreateOrganizationDto, UpdateOrganizationDto> {
  readonly queryOptions = { limit: 20, populate: 'user' };

  constructor(@InjectModel(Organization.name) model: Model<Organization>) {
    super(model);
  }
}
