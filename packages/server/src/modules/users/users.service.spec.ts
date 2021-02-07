import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';

import { ConfigsModule } from '../configs/configs.module';
import { mongooseTestModule } from '../mongoose-test.module';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';

import { MailerConfigModule } from 'common/configs/mailer/mailer.module';
import { MailerConfigService } from 'common/configs/mailer/mailer.service';

describe('UsersService', () => {
  let moduleRef: TestingModule;
  let service: UsersService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        mongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MailerModule.forRootAsync({ useClass: MailerConfigService }),
        MailerConfigModule,
        ConfigsModule,
      ],
      providers: [UsersService],
    }).compile();

    service = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
