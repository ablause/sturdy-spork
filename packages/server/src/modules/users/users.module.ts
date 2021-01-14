import { Module, forwardRef, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';

import { User, UserSchema } from './schemas/user.schema';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';

@Global()
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.pre('save', function (next) {
            if (!this.isModified('password')) next();

            this.hashingPassword()
              .then(() => next())
              .catch((err) => next(err));
          });

          return schema;
        },
      },
    ]),
    forwardRef(() => AuthModule),
    MailerModule,
  ],
  exports: [UsersService],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
