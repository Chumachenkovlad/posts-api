import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(returns => User, { name: 'user' })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findById(id);
  }

  @Query(returns => [User], { name: 'users' })
  async getUsers() {
    return this.usersService.findAll();
  }
}
