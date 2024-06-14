import { Module } from '@nestjs/common';
import { BookingsResolver } from './bookings.resolver';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { clientProxyBookings } from 'src/common';

@Module({
  providers: [{
    provide: 'BookingsServiceClient',
    useFactory: (): ClientGrpcProxy => {
      return clientProxyBookings();
    },
  }, 
  BookingsResolver]
})
export class BookingsModule {}
