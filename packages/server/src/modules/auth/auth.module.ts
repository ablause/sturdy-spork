import { forwardRef, Global, Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersService } from '~modules/users/users.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersModule } from '~modules/users/users.module';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const options: JwtModuleOptions = {
          secret: configService.get('JWT_SECRET'),
        };

        const jwtExpiresIn = configService.get('JWT_EXPIRES_IN');

        if (jwtExpiresIn) {
          options.signOptions = {
            expiresIn: jwtExpiresIn,
          };
        }

        return options;
      },
      inject: [ConfigService],
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
