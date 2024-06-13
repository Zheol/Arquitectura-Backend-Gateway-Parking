import { Observable } from "rxjs";
export interface Empty {
}
export interface Bookings {
    id: number;
    dateHourStart: Date;
    dateHourFinish: Date;
    status: string;
    patente: string;
    idZone: number;
    idUser: number;
}

export interface inputCreateBooking {
    dateHourStart: string;
    patente: string;
    idZone: number;
    idUser: number;
}

export interface createBookingResponse {
    success: boolean;
}

export interface inputFindOneBooking {
    id: number;
}

export interface BookingsServiceClient {
    findAll(request: Empty): Observable<Bookings>;
    create(request: inputCreateBooking): Observable<createBookingResponse>;
}

export interface ZonesServiceClient {
    updateAvailableSpots(request: UpdateAvailableSpotsRequest): Observable<UpdateAvailableSpotsResponse>;
}

export interface UpdateAvailableSpotsRequest {
    zoneId: number;
}

export interface UpdateAvailableSpotsResponse {
    success: boolean;
}
