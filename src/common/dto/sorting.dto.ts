import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

@ArgsType()
@ObjectType('SortingType')
export class SortingDto {
  @Field()
  prop: string;
  @Field()
  direction: string;
}
