import { Observable } from "rxjs";
import { Zones } from "src/zones/zones.pb";
export interface Empty {
}
export interface Bookings {
    id: number;
    dateHourStart: string;
    dateHourFinish: string;
    status: string;
    patente: string;
    idZone: number;
    idUser: number;
    amount?: number;
    zone?: Zones;
}

export interface checkOutBookingResponse {
    success: boolean;
    message?: string;
    booking?: Bookings;
}

export interface inputCreateBooking {
    dateHourStart: string;
    patente: string;
    idZone: number;
    idUser: number;
}

export interface createBookingResponse {
    success: boolean;
    message?: string;
}

export interface inputFindOneBooking {
    id: number;
}

export interface arrayBookings {
    bookings: Bookings[];
}

export interface inputCheckOutBooking {
    id: number;
    dateHourFinish: string;
}




export interface BookingsServiceClient {
    findAll(request: Empty): Observable<arrayBookings>;
    create(request: inputCreateBooking): Observable<createBookingResponse>;
    findOne(request: inputFindOneBooking): Observable<Bookings>;
    findAllByUser(request: inputFindOneBooking): Observable<arrayBookings>;
    checkOut(request: inputCheckOutBooking): Observable<checkOutBookingResponse>;
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
