import { Module } from '@nestjs/common';
import { MongooseConfigService } from './mongoose.service';

@Module({
  providers: [MongooseConfigService],
})
export class MongooseConfigModule {}
