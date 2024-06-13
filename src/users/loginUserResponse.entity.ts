import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginUserResponse {
  @Field()
  token: string;

}