import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

@ArgsType()
@ObjectType()
export class SortingDto {
  @Field()
  prop: string;
  @Field()
  direction: string;
}
