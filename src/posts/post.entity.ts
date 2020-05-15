import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
    AutoIncrement,
    Column,
    Length,
    Model,
    NotEmpty,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

import { ErrorsMap } from '../common/const/errors.const';

@Table({
  tableName: 'posts',
  timestamps: true,
  paranoid: true
})
@ObjectType()
export class Post extends Model<Post> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @Field(() => Int)
  id: number;

  @Length({ min: 10, max: 100, msg: ErrorsMap.LENGTH })
  @NotEmpty({ msg: ErrorsMap.REQUIRED })
  @Column
  @Field()
  title: string;

  @Length({ min: 10, max: 1000, msg: ErrorsMap.LENGTH })
  @NotEmpty({ msg: ErrorsMap.REQUIRED })
  @Column
  @Field()
  body: string;

  @Field(() => Int, { nullable: false })
  @NotEmpty({ msg: ErrorsMap.REQUIRED })
  @Column
  authorId: number;
}
