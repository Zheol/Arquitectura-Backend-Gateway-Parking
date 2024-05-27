import { Test, TestingModule } from '@nestjs/testing';
import { ZonesResolver } from './zones.resolver';

describe('ZonesResolver', () => {
  let resolver: ZonesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZonesResolver],
    }).compile();

    resolver = module.get<ZonesResolver>(ZonesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
