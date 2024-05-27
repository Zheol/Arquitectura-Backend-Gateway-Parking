import { Module } from '@nestjs/common';
import { ZonesResolver } from './zones.resolver';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { clientProxyZones } from 'src/common';

@Module({
  providers: [
    {
      provide: 'ZonesServiceClient',
      useFactory: (): ClientGrpcProxy => {
        return clientProxyZones();
      },
    }, 
    ZonesResolver]
})
export class ZonesModule {}
