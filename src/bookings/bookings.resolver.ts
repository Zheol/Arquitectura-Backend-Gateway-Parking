import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { BookingsServiceClient, inputCheckOutBooking, inputCreateBooking, inputFindOneBooking } from './bookings.pb';
import { createBookingResponse } from './dto/createBookingResponse.entity';
import { CreateBookingInput } from './dto/create-booking.input';
import { firstValueFrom } from 'rxjs';
import { Bookings } from './bookings.entity';
import { arrayBookings } from './arrayBookings.entity';


@Resolver()
export class BookingsResolver {
    constructor(
        @Inject('BookingsServiceClient')
        private readonly bookingsServiceClient: ClientGrpcProxy,
    ) {}
    private bookingsService: BookingsServiceClient;

    onModuleInit(): void {
        this.bookingsService =
            this.bookingsServiceClient.getService<BookingsServiceClient>('BookingsService');
    }

    @Mutation(returns => createBookingResponse)
    async createBooking(@Args('createBookingInput') createBookingInput: CreateBookingInput): Promise<createBookingResponse> {
        const request: inputCreateBooking = {
            dateHourStart: createBookingInput.dateHourStart,
            patente: createBookingInput.patente,
            idZone: createBookingInput.idZone,
            idUser: createBookingInput.idUser,
        };
        const response: createBookingResponse = await firstValueFrom(this.bookingsService.create(request));
        return response;
    }

    @Query(returns => Bookings)
    async findOneBooking(@Args('id') id: number): Promise<Bookings> {
        const request: inputFindOneBooking = { id };
        const response= await firstValueFrom(this.bookingsService.findOne(request));
        return response;
    }

    @Query(returns => arrayBookings)
    async findAllBookings(): Promise<arrayBookings> {
        const request = {};
        const response = await firstValueFrom(this.bookingsService.findAll(request));
        console.log(response);
        return response;
    }

    @Query(returns => arrayBookings)
    async findAllBookingsByUser(@Args('id') id: number): Promise<arrayBookings> {
        const request: inputFindOneBooking = { id };
        const response = await firstValueFrom(this.bookingsService.findAllByUser(request));
        console.log(response);
        return response;
    }

    @Mutation(returns => Bookings)
    async checkOutBooking(@Args('id') id: number, @Args('dateHourFinish') dateHourFinish: string): Promise<Bookings> {
        const request: inputCheckOutBooking = { id, dateHourFinish };
        const response = await firstValueFrom(this.bookingsService.checkOut(request));
        console.log(response);
        return response;
    }

    
}
