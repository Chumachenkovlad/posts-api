import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';

@ArgsType()
@ObjectType()
export class PaginationDto {
  @Field(type => Int)
  limit: number;

  @Field(type => Int)
  offset: number;
}

@ObjectType()
export class PaginationRes extends PaginationDto {
    @Field(type => Int)
    count: number;
}

@ArgsType()
export class PaginationArgs extends PaginationDto {}
