import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ZonesModule } from './zones/zones.module';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ZonesModule,UsersModule, BookingsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
