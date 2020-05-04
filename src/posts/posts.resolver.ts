import { Resolver } from '@nestjs/graphql';

import { BaseResolver } from '../common/base/base-entity.resolver';
import { PostsFilter } from './post.dto';
import { Post } from './post.entity';
import { PostsService } from './posts.service';

@Resolver(of => Post)
export class PostsResolver extends BaseResolver(Post, PostsFilter) {
  constructor(protected postsService: PostsService) {
    super();
  }
}
