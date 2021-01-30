import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule as NestConfigsModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigsService } from './configs.service';
import { IConfigOptions } from './interfaces/configOptions.interface';
import { Config, ConfigSchema } from './schemas/config.schema';

@Module({})
export class ConfigsModule extends NestConfigsModule {
  static store(options: IConfigOptions): DynamicModule {
    return {
      module: ConfigsModule,
      imports: [
        MongooseModule.forFeature([
          { name: Config.name, schema: ConfigSchema },
        ]),
      ],
      providers: [
        {
          provide: 'STORE_OPTIONS',
          useValue: options,
        },
        ConfigsService,
      ],
      exports: [ConfigsService],
    };
  }
}
