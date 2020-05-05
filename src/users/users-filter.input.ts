import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType('UsersFilterType')
export class UsersFilterInput {
  @Field()
  email: string;
}
