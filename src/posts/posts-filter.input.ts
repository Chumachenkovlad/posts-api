import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType('PostsFilterType')
export class PostsFilterInput {
  @Field(() => Int)
  authorId: number;
}
