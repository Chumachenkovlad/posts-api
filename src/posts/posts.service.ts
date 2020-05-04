import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

import { BaseEntityService } from '../common/base/base-entity.service';
import { SortingDto } from './../common/dto/sorting.dto';
import { PostDto, PostsFilter } from './post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService extends BaseEntityService<
  Post,
  PostDto,
  PostsFilter
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
}
