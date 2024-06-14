import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class createBookingResponse {
    @Field(type => Boolean)
    success: boolean;
}