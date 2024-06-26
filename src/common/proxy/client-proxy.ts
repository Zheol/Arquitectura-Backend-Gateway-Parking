import {
    ClientGrpcProxy,
    ClientProxyFactory,
    Transport,
  } from '@nestjs/microservices';
import { join } from 'path';


export const clientProxyZones = (): ClientGrpcProxy => {
    return ClientProxyFactory.create({
        transport: Transport.GRPC,
        options: {
            url: process.env.ZONES_GRPC_SERVER_URL || '0.0.0.0:50052',
            package: 'zones',
            protoPath: join(__dirname, '../../../src/zones/zones.proto'),
        },
    });
};