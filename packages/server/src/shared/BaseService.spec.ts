import { InjectModel, Schema, Prop, MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Test, TestingModule } from '@nestjs/testing';
import { Document, Model } from 'mongoose';

import BaseService from './BaseService';

@Schema()
class ModelTest extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;
}

class ServiceTest extends BaseService<ModelTest> {
  readonly queryOptions = { limit: 10 };

  constructor(@InjectModel(ModelTest.name) model: Model<ModelTest>) {
    super(model);
  }
}

const exemple = {
  name: 'test',
  description: 'model for test',
};

describe('BaseService', () => {
  let moduleRef: TestingModule;
  let mongodb: MongoMemoryServer;
  let service: ServiceTest;

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
        MongooseModule.forFeature([{ name: ModelTest.name, schema: SchemaFactory.createForClass(ModelTest) }]),
      ],
      providers: [ServiceTest],
    }).compile();

    service = moduleRef.get<ServiceTest>(ServiceTest);
  });

  afterEach(async () => {
    await moduleRef.close();
    await mongodb.stop();
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create document', async () => {
    const docA = await service.create(exemple);

    expect(docA._id).toBeDefined();
    expect(docA).toMatchObject(exemple);
  });

  it('should get one document', async () => {
    const doc = await service.create(exemple);
    const result = await service.findOne(doc._id);

    expect(result._id).toStrictEqual(doc._id);
    expect(result).toMatchObject(exemple);
  });

  it('should get all documents', async () => {
    const createDocs = async (nb: number) => {
      return Promise.all(
        [...Array(nb).keys()].map((i) => service.create({ ...exemple, name: `${exemple.name}-${nb}-${i}` })),
      );
    };

    const docs = await createDocs(8);

    const result0 = await service.findAll({});
    expect(result0.length).toBe(8);

    const result1 = await service.findAll({ page: 1, limit: 4 });
    expect(result1.length).toBe(4);

    const result2 = await service.findAll({ page: 2, limit: 4 });
    expect(result2.length).toBe(4);

    expect(result1).not.toMatchObject(result2);
    expect([...result1, ...result2]).toMatchObject(docs);
  });

  it('should update document', async () => {
    const doc = await service.create(exemple);
    const result = await service.update(doc._id, { name: 'NameModified' });

    expect(result._id).toStrictEqual(doc._id);
    expect(result.name).not.toBe(doc.name);
  });

  it('should remove document', async () => {
    const doc = await service.create(exemple);
    let result = await service.findAll({});

    expect(result.length).toBe(1);

    await service.delete(doc._id);
    result = await service.findAll({});

    expect(result.length).toBe(0);
  });
});
