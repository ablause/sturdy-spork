import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { OrganizationsService } from './organizations.service';
import { Organization, OrganizationSchema } from './schemas/organization.schema';

const exemple = {
  name: 'testOrg',
  address: 'rue du pont 10, 1000 bruxelles',
  description: 'Organization for test',
};

describe('OrganizationsService', () => {
  let moduleRef: TestingModule;
  let mongodb: MongoMemoryServer;
  let service: OrganizationsService;

  beforeEach(async () => {
    mongodb = new MongoMemoryServer();
    moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => ({
            uri: await mongodb.getUri(),
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
          }),
        }),
        MongooseModule.forFeature([{ name: Organization.name, schema: OrganizationSchema }]),
      ],
      providers: [OrganizationsService],
    }).compile();

    service = moduleRef.get<OrganizationsService>(OrganizationsService);
  });

  afterEach(async () => {
    await moduleRef.close();
    await mongodb.stop();
  });

  it('Organization should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create organization', async () => {
    const organization = await service.create(exemple);

    expect(organization._id).toBeTruthy();
    expect(organization.name).toBe(exemple.name);
    expect(organization.address).toBe(exemple.address);
    expect(organization.description).toBe(exemple.description);
  });

  it('should get organization', async () => {
    const organization = await service.create(exemple);
    const result = await service.findOne(organization._id);

    expect(result._id).toStrictEqual(organization._id);
  });

  it('should get all organizations', async () => {
    await service.create(exemple);
    const result = await service.findAll({ page: 1, limit: 10 });

    expect(result.length).toBe(1);
  });

  it('should update organization', async () => {
    const organization = await service.create(exemple);
    const organizationUpdated = await service.update(organization._id, {
      name: 'Orgtest',
    });

    expect(organizationUpdated._id).toStrictEqual(organization._id);
    expect(organizationUpdated.name).toBe('Orgtest');
  });

  it('should remove organization', async () => {
    const organization = await service.create(exemple);
    let result = await service.findAll({ limit: 10 });

    expect(result.length).toBe(1);

    await service.delete(organization._id);
    result = await service.findAll({ limit: 10 });

    expect(result.length).toBe(0);
  });
});
