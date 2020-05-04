type Pagination = {
  offset: number;
  limit: number;
};

type Filter<T> = {
  [P in keyof T]?: string;
};

type Sorting<T> = {
  prop: keyof T;
  direction: 'asc' | 'desc';
};

export type FindAllQuery<T> = Pagination & Filter<T> & Sorting<T>;

export type FindAllResult<M> = {
  rows: M[];
  count: number;
} & Partial<FindAllQuery<M>>;
