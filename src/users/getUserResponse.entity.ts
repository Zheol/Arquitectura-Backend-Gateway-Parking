import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GetUserResponse {
  @Field(type => Number)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(type => Boolean)
  tipoUser: boolean;
}