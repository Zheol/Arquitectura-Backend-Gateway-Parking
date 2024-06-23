import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Zones } from "src/zones/zones.entity";

@ObjectType()
export class Bookings {
    @Field(type => Int)
    id: number;
    @Field(type => String, {nullable: true})
    dateHourStart: string;
    @Field(type => String, {nullable: true})
    dateHourFinish: string;
    @Field(type => String, {defaultValue: 'Activa'})
    status: string;
    @Field(type => String)
    patente: string;
    @Field(type => Int)
    idZone: number;
    @Field(type => Int)
    idUser: number;
    @Field(type => Zones, {nullable: true})
    zone?: Zones;
    @Field(type => Int, {nullable: true})
    amount?: number;
}