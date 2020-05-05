import { PaginationArgs } from '../dto/pagination.args';
import { SortingDto } from '../dto/sorting.dto';

export interface IEntitiesListArgs<T> {
  pagination: PaginationArgs;
  sorting: SortingDto;
  filter: T;
}
