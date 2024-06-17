import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateZoneInput{
    @Field()
    name: string;
    @Field()
    cantEstacionamientosTotales: string;   
    
}
