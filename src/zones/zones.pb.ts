import { Observable } from "rxjs";
export interface Empty {
}
export interface Zones {
    id: number;
    name: string;
    cantEstacionamientosTotales: number;
    cantEstacionamientosOcupados: number;
}
export interface inputFindOne {
    id: number;
}
export interface ZonesServiceClient {
    create(request: CreateZoneRequest): Observable<CreateZoneResponse>;
    findAll(request: Empty): Observable<arrayZones>;
    findOne(request: inputFindOne): Observable<Zones>;
}

export interface CreateZoneRequest {
    name: string;
    cantEstacionamientosTotales: number;
}
export interface CreateZoneResponse {
    success: boolean;
}
export interface arrayZones {
    zones: Zones[];
}

