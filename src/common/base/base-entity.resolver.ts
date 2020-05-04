import { Type } from '@nestjs/common';
import { Args, ArgsType, Field, Query, Resolver } from '@nestjs/graphql';

import { BaseEntitiesListRes } from '../dto/entities-list-res.dto';
import { BaseEntitiesListArgs } from '../dto/entities-list.args';
import { IEntitiesListArgs } from '../interfaces/entities-list-args.interface';
import { IEntitiesResList } from './../interfaces/entities-list-res.interface';
import { BaseEntityService } from './base-entity.service';

export function BaseResolver<
  T extends Type<unknown>,
  D extends object,
  F extends Type<unknown>
>(modelRef: T, filterRef: F): any {
  @Resolver({ isAbstract: true })
  @ArgsType()
  class EntitiesListArgs extends BaseEntitiesListArgs
    implements IEntitiesListArgs<F> {
    @Field(type => filterRef, { nullable: true })
    filter: F;
  }

  class EntitiesListRes extends BaseEntitiesListRes<unknown, unknown>(
    modelRef,
    filterRef
  ) {}

  abstract class BaseResolverHost {
    protected entityService: BaseEntityService<T, D, F>;

    @Query(type => EntitiesListRes, { name: `findAll${modelRef.name}` })
    async findAll(
      @Args(`${filterRef.name}Args`) args: EntitiesListArgs
    ): Promise<Partial<IEntitiesResList<T, F>>> {
      return this.entityService.findAll(args);
    }
  }
  return BaseResolverHost;
}
