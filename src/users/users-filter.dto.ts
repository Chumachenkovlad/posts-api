import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UsersFilter {
  @Field()
  email: string;
}
