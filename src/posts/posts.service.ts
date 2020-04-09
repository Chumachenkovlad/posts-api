import { Injectable } from '@nestjs/common';

import { Post } from './models/post.model';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    { id: 1, title: 'title1', votes: 0 },
    { id: 2, title: 'title2', votes: 0 },
    { id: 3, title: 'title3', votes: 0 }
  ];

  async findOneById(id: number) {
    return this.posts.find(post => post.id === id);
  }

  async findAll(query: { authorId: number }) {
    return this.posts;
  }

  async upvoteById({ id }: { id: number }) {
    const post = await this.findOneById(id);
    post.votes += 1;
    return post;
  }
}
