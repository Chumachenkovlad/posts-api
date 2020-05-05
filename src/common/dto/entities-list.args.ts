import { ArgsType, Field } from '@nestjs/graphql';

import { PaginationArgs } from './pagination.args';
import { SortingDto } from './sorting.dto';

@ArgsType()
export class BaseEntitiesListArgs {
  @Field(type => PaginationArgs, { nullable: true })
  pagination: PaginationArgs;

  @Field(type => SortingDto, { nullable: true })
  sorting: SortingDto;
}
