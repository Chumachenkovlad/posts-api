import { ArgsType, Field } from '@nestjs/graphql';

import { PaginationDto } from './pagination.dto';
import { SortingDto } from './sorting.dto';

@ArgsType()
export class BaseEntitiesListArgs {
  @Field(type => PaginationDto, { nullable: true })
  pagination: PaginationDto;

  @Field(type => SortingDto, { nullable: true })
  sorting: SortingDto;
}
