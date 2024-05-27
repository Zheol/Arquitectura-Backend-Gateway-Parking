import { Injectable } from '@nestjs/common';
import { Zones } from './zones.entity';

@Injectable()
export class ZonesService {
    findAll(): Zones {
        const zone = new Zones();
        zone.id = 1;
        zone.name = 'Zona 1';
        zone.cant_estacionamientos_totales = 100;
        zone.cant_estacionamientos_ocupados = 50;
        return zone;
    }
        
}



