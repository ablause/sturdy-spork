import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseTestService } from './mongoose-testing.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseTestService,
    }),
  ],
})
class MongooseTestingModule extends MongooseModule {}

export { MongooseTestingModule };
