import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Zones {
    @Field(type => Int)
    id: number;
    @Field(type => String)
    name: string;
    @Field(type => Int)
    cant_estacionamientos_totales: number;
    @Field(type => Int)
    cant_estacionamientos_ocupados: number;
}