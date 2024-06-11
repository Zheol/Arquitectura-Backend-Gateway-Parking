import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { clientProxyUsers } from 'src/common/proxy/client2-proxy';

@Module({
  providers: [
    {
      provide: 'UserServiceClient',
      useFactory: (): ClientGrpcProxy => {
        return clientProxyUsers();
      },
    },
    UsersResolver,
  ],
})
export class UsersModule {}