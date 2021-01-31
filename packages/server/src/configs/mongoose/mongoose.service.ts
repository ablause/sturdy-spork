import { Injectable } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: process.env.DATABASE_URL,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    };
  }
}
