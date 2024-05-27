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
            url: '0.0.0.0:50051',
            package: 'zones',
            protoPath: join(__dirname, '../../../src/zones/zones.proto'),
        },
    });
};