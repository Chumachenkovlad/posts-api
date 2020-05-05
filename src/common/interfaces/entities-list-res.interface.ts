import { PaginationDto } from '../dto/pagination.dto';
import { SortingDto } from '../dto/sorting.dto';

export interface IEntitiesResList<M, F> {
  rows: M[];
  filter: F;
  pagination: PaginationDto;
  sorting: SortingDto;
}
