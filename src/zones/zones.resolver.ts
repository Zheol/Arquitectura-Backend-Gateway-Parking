import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Zones } from './zones.entity';
import { Inject } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { CreateZoneRequest, CreateZoneResponse, ZonesServiceClient } from './zones.pb';
import { firstValueFrom } from 'rxjs';
import { CreateZoneInput } from './dto/create-zone.input';


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
        
        return response;
    }
    @Mutation(returns => Boolean)
    async create(@Args('inputCreateZone') inputCreateZone: CreateZoneInput): Promise<boolean> {
        const request: CreateZoneRequest = {
        name: inputCreateZone.name,
        cantEstacionamientosTotales: parseInt(inputCreateZone.cantEstacionamientosTotales),
        cantEstacionamientosOcupados: parseInt(inputCreateZone.cantEstacionamientosOcupados),
        };
        console.log("a")
        const response: CreateZoneResponse = await firstValueFrom(this.zonesService.create(request));
        return response.success;
  }
}
