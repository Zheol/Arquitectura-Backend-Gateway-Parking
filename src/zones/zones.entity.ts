import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Zones {
    @Field(type => Int)
    id: number;
    @Field(type => String)
    name: string;
    @Field(type => Int)
    cantEstacionamientosTotales: number;
    @Field(type => Int, {defaultValue: 0})
    cantEstacionamientosOcupados: number;
}