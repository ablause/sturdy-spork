import { Module } from '@nestjs/common';
import { MailerConfigService } from './mailer.service';

@Module({
  providers: [MailerConfigService],
})
export class MailerConfigModule {}
