import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';

export class MongooseTestService implements OnModuleInit, OnModuleDestroy {
  private mongodb: MongoMemoryServer;

  onModuleInit(): any {
    this.mongodb = new MongoMemoryServer();
  }

  async createMongooseOptions() {
    return {
      uri: await this.mongodb.getUri(),
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
    };
  }

  onModuleDestroy(): any {
    if (this.mongodb) this.mongodb.stop();
  }
}
