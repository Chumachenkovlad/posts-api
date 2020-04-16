import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { PaginatedUsers, User } from './user.entity';
import { UserInput } from './users.input';
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
  async createUser(@Args('userInput') userDto: UserInput) {
    return this.usersService.create(userDto);
  }

  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return this.usersService.findById(user.id);
  }
}
