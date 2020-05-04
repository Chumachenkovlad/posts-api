import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from '../users/users.module';
import { Post } from './post.entity';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [SequelizeModule.forFeature([Post]), UsersModule],
  providers: [PostsService, PostsResolver],
  exports: [PostsService, SequelizeModule]
})
export class PostsModule {}
