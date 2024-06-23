import { Field, ObjectType } from "@nestjs/graphql";
import { Bookings } from "../bookings.entity";

@ObjectType()
export class checkOutBookingResponse {
    @Field(type => Boolean)
    success: boolean;
    @Field(type => String, { nullable: true })
    message?: string;
    @Field(type => Bookings, { nullable: true })
    booking?: Bookings;
}