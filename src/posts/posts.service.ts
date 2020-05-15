import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

import { BaseEntityService } from '../common/base/base-entity.service';
import { SortingDto } from './../common/dto/sorting.dto';
import { PostDto } from './post.dto';
import { Post } from './post.entity';
import { PostsFilterInput } from './posts-filter.input';

@Injectable()
export class PostsService extends BaseEntityService<
  Post,
  PostDto,
  PostsFilterInput
> {
  protected defaultSorting: SortingDto = {
    prop: 'title',
    direction: 'DESC'
  };

  constructor(
    @InjectModel(Post)
    model: typeof Post,
    sequelize: Sequelize
  ) {
    super(model, sequelize);
  }

  async create(dto: PostDto & { authorId: number }): Promise<Post> {
    return this.model.create(dto, { raw: true });
  }
}
