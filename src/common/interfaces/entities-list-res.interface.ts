import { PaginationRes } from '../dto/pagination.dto';
import { SortingDto } from '../dto/sorting.dto';

export interface IEntitiesResList<M, F> {
  rows: M[];
  filter: F;
  pagination: PaginationRes;
  sorting: SortingDto;
}
