import { Test, TestingModule } from '@nestjs/testing';

import { ConfigsService } from './configs.service';
import { IConfigOptions } from './interfaces/configOptions.interface';

describe('ConfigsService', () => {
  let service: ConfigsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigsService,
          useValue: {
            name: 'test',
            environment: 'test',
            type: 'core',
          } as IConfigOptions,
        },
      ],
    }).compile();

    service = module.get<ConfigsService>(ConfigsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
