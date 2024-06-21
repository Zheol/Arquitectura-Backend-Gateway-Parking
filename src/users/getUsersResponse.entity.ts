// getUsersResponse.entity.ts
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './users.entity';

@ObjectType()
export class GetUsersResponse {
  @Field(() => [User])
  users: User[];
}