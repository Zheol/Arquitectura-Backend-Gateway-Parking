import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { BookingsServiceClient, inputCreateBooking } from './bookings.pb';
import { createBookingResponse } from './dto/createBookingResponse.entity';
import { CreateBookingInput } from './dto/create-booking.input';
import { firstValueFrom } from 'rxjs';

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
    
}
