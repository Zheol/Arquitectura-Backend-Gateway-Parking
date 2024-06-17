import { Field, ObjectType } from "@nestjs/graphql";
import { Zones } from "./zones.entity";

@ObjectType()
export class arrayZones {
    @Field(type => [Zones])
    zones: Zones[];
 
}