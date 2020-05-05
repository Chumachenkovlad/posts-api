import { NotFoundException, OnModuleInit } from '@nestjs/common';
import { merge } from 'lodash';
import { Model, Sequelize } from 'sequelize-typescript';

import { ErrorsMap } from '../const/errors.const';
import { FindAllQuery } from '../dto/find-all-query.dto';
import { PaginationInput } from '../dto/pagination.input';
import { IEntitiesListArgs } from '../interfaces/entities-list-args.interface';
import { IEntitiesResList } from '../interfaces/entities-list-res.interface';
import { DEFAULT_LIMIT } from './../const/common.const';
import { SortingDto } from './../dto/sorting.dto';

const defaultQuery: Partial<FindAllQuery<unknown>> = {
  limit: DEFAULT_LIMIT,
  offset: 0
};

export abstract class BaseEntityService<M, D extends object, F extends object>
  implements OnModuleInit {
  protected defaultQuery: Partial<IEntitiesListArgs<F>> = {};
  protected defaultSorting: Partial<SortingDto> = {};
  protected defaultPagination: PaginationInput = {
    limit: DEFAULT_LIMIT,
    offset: 0
  };

  onModuleInit() {
    this.defaultQuery = merge(
      {},
      this.defaultQuery,
      { pagination: this.defaultPagination },
      { sorting: this.defaultSorting }
    );
  }

  constructor(
    protected model: { new (): M } & typeof Model,
    protected sequelize: Sequelize
  ) {}

  async create(dto: D): Promise<M> {
    return this.model.create(dto, { raw: true });
  }

  async update(id: number, dto: D) {
    const entity = await this.findById(id);

    if (!entity) {
      throw new NotFoundException(ErrorsMap.ENTITY_NOT_FOUND);
    }

    await this.sequelize.transaction(async transaction => {
      await entity.set(dto).save({ transaction });
    });

    return this.findById(id);
  }

  async findById(id: number) {
    return this.model.findOne({ where: { id } });
  }

  async findAll(
    query: Partial<IEntitiesListArgs<F>> = {}
  ): Promise<Partial<IEntitiesResList<M, F>>> {
    const { filter, sorting, pagination } = {
      ...defaultQuery,
      ...query
    };

    const { rows, count } = await this.model.findAndCountAll({
      raw: true,
      where: {
        ...pagination,
        ...(filter || {})
      },
      order: sorting ? [sorting.prop, sorting.direction] : []
    });

    return {
      rows,
      filter: filter || ({} as F),
      pagination: {
        ...pagination,
        count
      },
      sorting
    };
  }
}
