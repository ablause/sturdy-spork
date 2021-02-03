import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
// import * as path from 'path';

// Configs
import { GraphqlConfigModule } from './common/configs/graphql/graphql.module';
import { GraphqlConfigService } from './common/configs/graphql/graphql.service';
import { MongooseConfigModule } from './common/configs/mongoose/mongoose.module';
import { MongooseConfigService } from './common/configs/mongoose/mongoose.service';
import { MailerConfigService } from './common/configs/mailer/mailer.service';
import { MailerConfigModule } from './common/configs/mailer/mailer.module';

// Modules
import { ConfigsModule } from './modules/configs/configs.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { CustomersModule } from './modules/customers/customers.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigsModule.forRoot({ cache: true, isGlobal: true }),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    GraphQLModule.forRootAsync({ useClass: GraphqlConfigService }),
    MailerModule.forRootAsync({ useClass: MailerConfigService }),
    GraphqlConfigModule,
    MongooseConfigModule,
    MailerConfigModule,
    OrganizationsModule,
    CustomersModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
