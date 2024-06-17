import {Field, InputType } from '@nestjs/graphql';

@InputType()
export class findOneInput{
    @Field()
    id: number;

}
