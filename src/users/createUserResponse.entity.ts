import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class createUserResponse {
    @Field(type => Boolean)
    success: boolean;
}