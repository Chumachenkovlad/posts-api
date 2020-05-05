import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(type => Int)
  limit: number;
  @Field(type => Int)
  offset: number;
}
