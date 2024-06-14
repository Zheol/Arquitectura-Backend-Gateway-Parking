import {
    ClientGrpcProxy,
    ClientProxyFactory,
    Transport,
  } from '@nestjs/microservices';
import { join } from 'path';


export const clientProxyBookings = (): ClientGrpcProxy => {
    return ClientProxyFactory.create({
        transport: Transport.GRPC,
        options: {
            url: '0.0.0.0:50051',
            package: 'bookings',
            protoPath: join(__dirname, '../../../src/bookings/bookings.proto'), 
        },
    });
};