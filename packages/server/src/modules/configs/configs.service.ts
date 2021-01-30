import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Config } from './schemas/config.schema';
import { IConfigOptions } from './interfaces/configOptions.interface';

@Injectable()
export class ConfigsService {
  private config: { [key: string]: string };

  constructor(
    @InjectModel(Config.name) private readonly configModel: Model<Config>,
    @Inject('STORE_OPTIONS') private readonly configOptions: IConfigOptions,
  ) {
    this.initialize();
  }

  private async initialize() {
    const results = await this.configModel.find(this.configOptions).exec();

    if (!results) {
      console.log(`${this.configOptions.name} is empty`);
    }

    this.config = Object.assign(
      {},
      ...results.map((result) => ({ [result.key]: result.value })),
    );
  }

  private async save(key: string) {
    return this.configModel.findOneAndUpdate(
      { key },
      { value: this.config[key] },
    );
  }

  public get(key: string): string {
    return this.config[key];
  }

  public set(key: string, value: any) {
    if (this.config[key]) {
      this.config[key] = value;
      this.save(key);
    }
  }
}
