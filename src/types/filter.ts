export type SortOption = 'PRICE_ASC' | 'PRICE_DESC' | 'NAME_ASC' | 'NAME_DESC';

export interface ProductFilters {
  searchQuery: string;
  category: string | null;
  sortBy: SortOption;
}
