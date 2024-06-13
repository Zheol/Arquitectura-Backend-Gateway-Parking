import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class CreateBookingInput {
    @Field()
    dateHourStart: string;
    @Field()
    patente: string;
    @Field()
    idZone: number;
    @Field()
    idUser: number;
}