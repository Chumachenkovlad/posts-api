import { ArgsType, Field } from '@nestjs/graphql';

import { UserDto } from './users.dto';

@ArgsType()
export class UserArgs extends UserDto {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}
