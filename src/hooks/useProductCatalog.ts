import { useCallback, useEffect, useRef, useState } from 'react';
import { isAxiosError } from 'axios';

import { fetchCategories, fetchProducts } from '../services/productService';
import type { Product, ProductCategory } from '../types/product';

interface ProductCatalogState {
  products: Product[];
  categories: ProductCategory[];
  isLoading: boolean;
  errorMessage: string | null;
  reload: () => Promise<void>;
}

const GENERIC_ERROR_MESSAGE = 'Something went wrong while loading products.';

export function useProductCatalog(): ProductCatalogState {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  const loadCatalog = useCallback(async () => {
    if (isMountedRef.current) {
      setIsLoading(true);
      setErrorMessage(null);
    }

    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
      ]);

      if (!isMountedRef.current) {
        return;
      }

      setProducts(productsResponse);
      setCategories(categoriesResponse);
    } catch (error) {
      if (!isMountedRef.current) {
        return;
      }

      if (isAxiosError(error)) {
        setErrorMessage(error.message || GENERIC_ERROR_MESSAGE);
      } else {
        setErrorMessage(GENERIC_ERROR_MESSAGE);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    void loadCatalog();

    return () => {
      isMountedRef.current = false;
    };
  }, [loadCatalog]);

  return {
    products,
    categories,
    isLoading,
    errorMessage,
    reload: loadCatalog,
  };
}
