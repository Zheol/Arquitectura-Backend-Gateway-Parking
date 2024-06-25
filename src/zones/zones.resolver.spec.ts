import { Test, TestingModule } from '@nestjs/testing';
import { ZonesResolver } from './zones.resolver';
import { of } from 'rxjs';



const mockClientGrpcProxy = {
  getService: jest.fn(() => ({
    findAll: jest.fn(() => of({ zones: [] })),
    create: jest.fn(() => of({ id: 1, name: 'Zone 1' })),
    findOne: jest.fn(() => of({ id: 1, name: 'Zone 1' })),
    
  })),
};

describe('ZonesResolver', () => {
  let resolver: ZonesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZonesResolver,
        {
          provide: 'ZonesServiceClient',
          useValue: mockClientGrpcProxy,
        },
      ],
    }).compile();

    resolver = module.get<ZonesResolver>(ZonesResolver);
    resolver.onModuleInit();  
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('findAllZones should return an array of zones', async () => {
    const result = await resolver.findAllZones();
    expect(result).toEqual({ zones: [] });
  });

  it('create should create a zone and return the response', async () => {
    const inputCreateZone = { name: 'Zone 1', cantEstacionamientosTotales: '10' };
    const result = await resolver.create(inputCreateZone);
    expect(result).toEqual({ id: 1, name: 'Zone 1' });
  });

  it('findOneZone should return a single zone', async () => {
    const result = await resolver.findOneZone(1);
    expect(result).toEqual({ id: 1, name: 'Zone 1' });
  });

 
});