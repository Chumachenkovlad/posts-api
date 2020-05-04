import { Field, InputType } from '@nestjs/graphql';

import { PostDto } from './post.dto';

@InputType()
export class PostInput extends PostDto {
  @Field()
  title: string;
  @Field()
  body: string;
}
