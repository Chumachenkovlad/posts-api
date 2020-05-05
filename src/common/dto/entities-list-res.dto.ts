import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

import { SortingDto } from './sorting.dto';

export function BaseEntitiesListRes<T, F>(modelRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class EntitiesListResType {
    @Field(type => [modelRef], { nullable: true })
    rows: T[];

    @Field(type => SortingDto, { nullable: true })
    sorting: SortingDto;
  }

  return EntitiesListResType;
}
