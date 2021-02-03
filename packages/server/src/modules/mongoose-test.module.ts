import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongodb: MongoMemoryServer;

export const mongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongodb = new MongoMemoryServer();

      return {
        uri: await mongodb.getUri(),
        useUnifiedTopology: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useCreateIndex: true,
        ...options,
      };
    },
  });

export const closeInMongooseConnection = async () => {
  if (mongodb) await mongodb.stop();
};
