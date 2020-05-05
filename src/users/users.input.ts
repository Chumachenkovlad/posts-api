import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}
