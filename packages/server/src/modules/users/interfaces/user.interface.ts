import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly identifier: string;
  readonly password: string;
  readonly enabled: boolean;

  readonly profile: {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly phone: string;
    readonly address: string;
  };

  permissions: string;

  lastSeenAt: Date;

  organisation: string;

  readonly passwordReset?: {
    readonly token: string;
    readonly expiration: Date;
  };

  checkPassword(password: string): Promise<boolean>;
}
