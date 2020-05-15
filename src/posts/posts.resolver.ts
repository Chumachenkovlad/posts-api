import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { BaseResolver } from '../common/base/base-entity.resolver';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { GqlAuthGuard } from './../auth/jwt-auth.guard';
import { Post } from './post.entity';
import { PostInput } from './post.input';
import { PostsFilterInput } from './posts-filter.input';
import { PostsService } from './posts.service';

@Resolver(of => Post)
@UseGuards(GqlAuthGuard)
export class PostsResolver extends BaseResolver(
  Post,
  PostsFilterInput,
  PostInput
) {
  constructor(protected entityService: PostsService) {
    super();
  }

  @Mutation(type => Post, { name: `createPost` })
  async create(
    @CurrentUser() user: User,
    @Args('postDto', { type: () => PostInput }) postDto: PostInput
  ): Promise<Post> {
    return this.entityService.create({ ...postDto, authorId: user.id });
  }
}
