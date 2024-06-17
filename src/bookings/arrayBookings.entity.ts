import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Bookings } from "./bookings.entity";
import { Zones } from "src/zones/zones.entity";

@ObjectType()
export class arrayBookings {
    @Field(type => [Bookings])
    bookings: Bookings[];


}