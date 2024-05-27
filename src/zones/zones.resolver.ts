import { Query, Resolver } from '@nestjs/graphql';
import { Zones } from './zones.entity';
import { Inject } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { ZonesServiceClient } from './zones.pb';
import { firstValueFrom } from 'rxjs';

@Resolver()
export class ZonesResolver {
    constructor(
       @Inject('ZonesServiceClient')
       private readonly zonesServiceClient: ClientGrpcProxy,
    ) {}
    private zonesService: ZonesServiceClient;

    onModuleInit(): void {
        this.zonesService =
            this.zonesServiceClient.getService<ZonesServiceClient>('ZonesService');
    }

    @Query(returns => Zones)
    async zones(): Promise<Zones> {
        const response: Zones = await firstValueFrom(this.zonesService.findAll({}));
        console.log(response);
        return response;
    }
}
