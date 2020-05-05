import { PaginationInput } from '../dto/pagination.input';
import { SortingDto } from '../dto/sorting.dto';

export interface IEntitiesListArgs<T> {
  pagination: PaginationInput;
  sorting: SortingDto;
  filter: T;
}
