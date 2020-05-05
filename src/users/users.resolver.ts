import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { BaseResolver } from '../common/base/base-entity.resolver';
import { User } from './user.entity';
import { UsersFilterInput } from './users-filter.input';
import { UserInput } from './users.input';
import { UsersService } from './users.service';

@Resolver(of => User)
export class UsersResolver extends BaseResolver(User, UsersFilterInput) {
  constructor(private usersService: UsersService) {
    super();
  }

  @Query(returns => User, { name: 'user' })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findById(id);
  }

  @Mutation(returns => User)
  async createUser(@Args('userInput') userDto: UserInput) {
    return this.usersService.create(userDto);
  }
}
