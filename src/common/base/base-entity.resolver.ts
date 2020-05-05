import { Type } from '@nestjs/common';
import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';

import { PaginationDto } from '../dto/pagination.dto';
import { SortingDto } from '../dto/sorting.dto';
import { BaseEntityService } from './base-entity.service';

export function BaseResolver<
  M extends Type<unknown>,
  D extends object,
  T extends Type<unknown>
>(modelRef: M, filterRef: T): any {
  @ObjectType()
  class EntitiesListRes {
    @Field(type => filterRef, { nullable: true })
    filter: T;

    @Field(type => [modelRef], { nullable: true })
    rows: M[];

    @Field(type => SortingDto, { nullable: true })
    sorting: SortingDto;

    @Field(type => PaginationDto, { nullable: true })
    pagination: PaginationDto;
  }

  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    protected entityService: BaseEntityService<M, D, T>;
    //  @Args(`${filterRef.name}Args`) filter: F,
    //  @Args(`PaginationArgs`) pagination: PaginationArgs,
    //  @Args(`SortingArgs`) sorting: SortingDto
    @Query(type => EntitiesListRes, { name: `findAll${modelRef.name}` })
    async findAll(): Promise<EntitiesListRes> {
      return this.entityService.findAll({}) as Promise<EntitiesListRes>;
    }
  }
  return BaseResolverHost;
}
