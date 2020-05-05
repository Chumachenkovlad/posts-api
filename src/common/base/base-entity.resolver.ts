import { Type } from '@nestjs/common';
import { Args, Field, ObjectType, Query, Resolver } from '@nestjs/graphql';

import { PaginationDto } from '../dto/pagination.dto';
import { SortingDto } from '../dto/sorting.dto';
import { SortingInput } from '../dto/sorting.input';
import { PaginationInput } from './../dto/pagination.input';
import { BaseEntityService } from './base-entity.service';

export function BaseResolver<
  M extends Type<unknown>,
  D extends object,
  T extends Type<unknown>
>(modelRef: M, filterRef: T): any {
  @ObjectType(`${modelRef.name}EntitiesListRes`)
  class EntitiesListRes {
    @Field(type => filterRef, { defaultValue: {} })
    filter: T;

    @Field(type => [modelRef], { defaultValue: [] })
    rows: M[];

    @Field(type => SortingDto, { nullable: true })
    sorting?: SortingDto;

    @Field(type => PaginationDto, { nullable: true })
    pagination?: PaginationDto;
  }

  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    protected entityService: BaseEntityService<M, D, T>;
    //  @Args(`${filterRef.name}Args`) filter: F,
    //  @Args(`PaginationArgs`) pagination: PaginationArgs,
    //  @Args(`SortingArgs`) sorting: SortingDto
    @Query(type => EntitiesListRes, { name: `findAll${modelRef.name}` })
    async findAll(
      @Args('filter', { type: () => filterRef }) filter: T,
      @Args('sorting') sorting: SortingInput,
      @Args('pagination') pagination: PaginationInput
    ): Promise<EntitiesListRes> {
      return this.entityService.findAll({
        filter,
        sorting,
        pagination
      }) as Promise<EntitiesListRes>;
    }
  }
  return BaseResolverHost;
}
