import { UseGuards } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { BaseResolver } from '../common/base/base-entity.resolver';
import { User } from './user.entity';
import { UsersFilterInput } from './users-filter.input';
import { UserInput } from './users.input';
import { UsersService } from './users.service';

@Resolver(of => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver extends BaseResolver(
  User,
  UsersFilterInput,
  UserInput
) {
  constructor(protected entityService: UsersService) {
    super();
  }
}
