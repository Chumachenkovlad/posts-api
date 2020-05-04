import { ArgsType } from '@nestjs/graphql';

export class UsersDto {
  readonly email: string;
  readonly username: string;
  readonly password: string;
}

@ArgsType()
export class UsersFilter {}
