import { Type } from '@nestjs/common';
import { Args, Field, Int, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';

import { PaginationDto } from '../dto/pagination.dto';
import { SortingDto } from '../dto/sorting.dto';
import { SortingInput } from '../dto/sorting.input';
import { PaginationInput } from './../dto/pagination.input';
import { BaseEntityService } from './base-entity.service';

export function BaseResolver<
  M extends Type<unknown>,
  D extends Type<unknown>,
  T extends Type<unknown>
>(modelRef: M, filterRef: T, entityInputRef: D): any {
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

    @Query(type => EntitiesListRes, { name: `findAll${modelRef.name}` })
    async findAll(
      @Args('filter', { type: () => filterRef, nullable: true }) filter: T,
      @Args('sorting') sorting: SortingInput,
      @Args('pagination') pagination: PaginationInput
    ): Promise<EntitiesListRes> {
      return this.entityService.findAll({
        filter,
        sorting,
        pagination
      }) as Promise<EntitiesListRes>;
    }

    @Query(type => modelRef, { name: `get${modelRef.name}` })
    async getOne(@Args('id', { type: () => Int }) id: number): Promise<M> {
      return this.entityService.findById(id);
    }

    @Mutation(type => modelRef, { name: `create${modelRef.name}` })
    async create(
      @Args('entityDto', { type: () => entityInputRef }) entityDto: D
    ): Promise<M> {
      return this.entityService.create(entityDto);
    }

    @Mutation(type => modelRef, { name: `update${modelRef.name}` })
    async update(
      @Args('id', { type: () => Int }) id: number,
      @Args('entityDto', { type: () => entityInputRef }) entityDto: D
    ): Promise<M> {
      return this.entityService.update(id, entityDto);
    }
  }
  return BaseResolverHost;
}
