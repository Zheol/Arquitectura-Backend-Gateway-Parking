import {
  ClientGrpcProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';

export const clientProxyUsers = (): ClientGrpcProxy => {
  return ClientProxyFactory.create({
    transport: Transport.GRPC,
    options: {
      url: process.env.GRPC_SERVER_URL || 'localhost:8089', // Corregir la URL del servidor gRPC si es necesario
      package: 'user',
      protoPath: join(__dirname, '../../../src/users/users.proto'),
    },
  });
};
