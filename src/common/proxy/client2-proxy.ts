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
        url: '0.0.0.0:50051',
        package: 'user',
        protoPath: join(__dirname, '../../../src/users/users.proto'),
      },
    });
  };