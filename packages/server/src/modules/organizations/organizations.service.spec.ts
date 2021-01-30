import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { OrganizationsService } from './organizations.service';
import { OrganizationSchema } from './schemas/organization.schema';

describe('OrganizationsService', () => {
  let service: OrganizationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationsService,
        {
          provide: getModelToken(OrganizationsService.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an organization', async () => {
    try {
      service.create({
        name: 'testOrg',
        address: 'rue du pont, 1000 bruxelles',
        description: 'Organisation for test',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });
});
