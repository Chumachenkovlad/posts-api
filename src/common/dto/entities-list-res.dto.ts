import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

import { IEntitiesResList } from '../interfaces/entities-list-res.interface';
import { PaginationDto, PaginationRes } from './pagination.dto';
import { SortingDto } from './sorting.dto';

export function BaseEntitiesListRes<T, F>(
  modelRef: Type<T>,
  filterTypeRef: Type<F>
): any {
  @ObjectType({ isAbstract: true })
  abstract class EntitiesListResType implements IEntitiesResList<T, F> {
    @Field(type => [modelRef], { nullable: true })
    rows: T[];

    @Field(type => filterTypeRef, { nullable: true })
    filter: F;

    @Field(type => PaginationDto)
    pagination: PaginationRes;

    @Field(type => SortingDto, { nullable: true })
    sorting: SortingDto;
  }

  return EntitiesListResType;
}
