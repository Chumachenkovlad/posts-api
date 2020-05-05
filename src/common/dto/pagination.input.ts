import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field(type => Int)
  limit: number;
  @Field(type => Int)
  offset: number;
}
