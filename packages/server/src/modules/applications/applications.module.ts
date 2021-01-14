import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsResolver } from './applications.resolver';

@Module({
  providers: [ApplicationsService, ApplicationsResolver]
})
export class ApplicationsModule {}
