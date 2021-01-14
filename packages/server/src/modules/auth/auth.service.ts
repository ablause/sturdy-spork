import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '~modules/users/interfaces/user.interface';

import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginResult } from './interfaces/login-result.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(loginAttempt: LoginUserDto) {
    const userToAttempt = await this.usersService.findOneByIdentifier(
      loginAttempt.identifier,
    );

    if (!userToAttempt.enabled) return undefined;

    let isMatch = false;

    try {
      isMatch = await userToAttempt.checkPassword(loginAttempt.password);
    } catch (error) {
      return undefined;
    }

    if (isMatch) {
      const token = this.createJwt(userToAttempt).token;
      const result: LoginResult = {
        user: userToAttempt,
        token,
      };

      userToAttempt.lastSeenAt = new Date();
      userToAttempt.save();
      return result;
    }

    return undefined;
  }

  public async validateJwtPayload(payload: JwtPayload) {
    const user = await this.usersService.findOneByIdentifier(
      payload.identifier,
    );

    if (user && user.enabled) {
      user.lastSeenAt = new Date();
      user.save();
    }

    return undefined;
  }

  createJwt(user: IUser): { data: JwtPayload; token: string } {
    const expiresIn = this.configService.get('JWT_EXPIRES_IN');
    let expiration: Date | undefined;

    if (expiresIn) {
      expiration = new Date();
      expiration.setTime(expiration.getTime() + expiresIn + 1000);
    }

    const data: JwtPayload = {
      identifier: user.identifier,
      expiration,
    };

    const jwt = this.jwtService.sign(data);

    return {
      data,
      token: jwt,
    };
  }
}
