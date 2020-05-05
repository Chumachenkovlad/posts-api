import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SortingInput {
  @Field()
  prop: string;
  @Field()
  direction: string;
}
