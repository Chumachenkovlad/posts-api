import { ArgsType } from '@nestjs/graphql';

export abstract class PostDto {
  abstract readonly title: string;
  abstract readonly body: string;
}

@ArgsType()
export class PostsFilter {
  authorId: string;
}
