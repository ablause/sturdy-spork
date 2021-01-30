import { Document } from 'mongoose';

export interface IConfig extends Document {
  readonly environment: string;
  readonly type: string;
  readonly name: string;
  readonly key: string;
  readonly value: any;
}
