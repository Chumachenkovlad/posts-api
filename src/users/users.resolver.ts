import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserArgs } from './users.args';
import { PaginatedUsers, User } from './users.entity';
import { UsersService } from './users.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(returns => User, { name: 'user' })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findById(id);
  }

  @Query(returns => PaginatedUsers, { name: 'users' })
  async getUsers() {
    return this.usersService.findAll();
  }

  @Mutation(returns => User)
  async createUser(@Args() userDto: UserArgs) {
    return this.usersService.create(userDto);
  }
}
