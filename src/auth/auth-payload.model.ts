import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../users/user.entity';

@ObjectType()
export class AuthPayload {
  @Field()
  token: string;
  @Field()
  expires: string;
  @Field(returns => User)
  user: User;
}
