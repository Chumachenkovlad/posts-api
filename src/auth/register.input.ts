import { Field, InputType } from '@nestjs/graphql';

import { UsersDto } from './../users/users.dto';

@InputType()
export class RegisterInput implements UsersDto {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}
