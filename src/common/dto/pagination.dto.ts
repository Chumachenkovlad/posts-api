import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationDto {
  @Field(type => Int)
  count: number;
  @Field(type => Int)
  limit: number;
  @Field(type => Int)
  offset: number;
}
