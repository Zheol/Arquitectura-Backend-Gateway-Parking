import { Module } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { ZonesResolver } from './zones.resolver';

@Module({
  providers: [ZonesService, ZonesResolver]
})
export class ZonesModule {}
