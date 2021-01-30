import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
// import * as path from 'path';

// Configs
import { GraphqlConfigModule } from './configs/graphql/graphql.module';
import { GraphqlConfigService } from './configs/graphql/graphql.service';
import { MongooseConfigModule } from './configs/mongoose/mongoose.module';
import { MongooseConfigService } from './configs/mongoose/mongoose.service';
import { MailerConfigService } from './configs/mailer/mailer.service';
import { MailerConfigModule } from './configs/mailer/mailer.module';

// Modules
import { ConfigsModule } from './modules/configs/configs.module';
import { ApplicationsModule } from './modules/applications/applications.module';
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
    ApplicationsModule,
    OrganizationsModule,
    CustomersModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
