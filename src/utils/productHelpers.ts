import type { ProductFilters, SortOption } from '../types/filter';
import type { Product } from '../types/product';

function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'PRICE_ASC':
      return sorted.sort((left, right) => left.price - right.price);
    case 'PRICE_DESC':
      return sorted.sort((left, right) => right.price - left.price);
    case 'NAME_ASC':
      return sorted.sort((left, right) => left.title.localeCompare(right.title));
    case 'NAME_DESC':
      return sorted.sort((left, right) => right.title.localeCompare(left.title));
    default:
      return sorted;
  }
}

export function applyProductFilters(products: Product[], filters: ProductFilters): Product[] {
  const normalizedQuery = filters.searchQuery.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchesSearch =
      normalizedQuery.length === 0 || product.title.toLowerCase().includes(normalizedQuery);
    const matchesCategory = !filters.category || product.category === filters.category;

    return matchesSearch && matchesCategory;
  });

  return sortProducts(filtered, filters.sortBy);
}
