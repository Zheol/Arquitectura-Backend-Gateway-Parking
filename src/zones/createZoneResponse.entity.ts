import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class createZoneResponse {
    @Field(type => Boolean)
    success: boolean;
}