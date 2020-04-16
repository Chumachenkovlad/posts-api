import { Field, InputType } from '@nestjs/graphql';

import { UsersDto } from './users.dto';

@InputType()
export class UserInput extends UsersDto {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}
