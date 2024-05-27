import { Query, Resolver } from '@nestjs/graphql';
import { ZonesService } from './zones.service';
import { Zones } from './zones.entity';

@Resolver()
export class ZonesResolver {
    constructor(
        private readonly zonesService: ZonesService
    ) {}

    @Query(returns => Zones)
    async zones(): Promise<Zones> {
        return this.zonesService.findAll();
    }
}
