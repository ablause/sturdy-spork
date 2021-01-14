import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateOrganizationDto, UpdateOrganizationDto } from './dtos';
import { IOrganization } from './interfaces/organization.interface';
import { Organization } from './schemas/organization.schema';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<Organization>,
  ) {}

  public async findAll(offset: number, limit: number) {
    return await this.organizationModel
      .find()
      .skip(offset)
      .limit(limit)
      .populate('user')
      .exec();
  }

  public async findOne(_id: string): Promise<Organization> {
    const organization = await this.organizationModel
      .findById({ _id })
      .populate('user')
      .exec();

    if (!organization) {
      throw new NotFoundException(`Organization #${_id} not found`);
    }

    return organization;
  }

  public async create(input: CreateOrganizationDto): Promise<IOrganization> {
    const newOrganization = await new this.organizationModel(input);
    return newOrganization.save();
  }

  public async update(
    _id: string,
    input: UpdateOrganizationDto,
  ): Promise<Organization> {
    const existingOrganisation = await this.organizationModel.findOneAndUpdate(
      { _id },
      input,
      { new: true },
    );

    if (!existingOrganisation) {
      throw new NotFoundException(`Organization #${_id} not found`);
    }

    return existingOrganisation;
  }

  public async remove(_id: string): Promise<unknown> {
    const deletedOrganization = await this.organizationModel.findByIdAndRemove(
      _id,
    );

    return deletedOrganization;
  }
}
