import { PaginationArgs } from '../dto/pagination.dto';
import { SortingDto } from '../dto/sorting.dto';

export interface IEntitiesListArgs<T> {
  pagination: PaginationArgs;
  sorting: SortingDto;
  filter: T;
}
