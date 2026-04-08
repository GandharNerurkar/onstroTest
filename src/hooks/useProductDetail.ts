import { isAxiosError } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

import { fetchProductById } from "../services/productService";
import type { Product } from "../types/product";

interface ProductDetailState {
  product: Product | null;
  isLoading: boolean;
  errorMessage: string | null;
  reload: () => Promise<void>;
}

const GENERIC_ERROR_MESSAGE = "Something went wrong while loading the product.";

export function useProductDetail(productId: number | null): ProductDetailState {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  const loadProduct = useCallback(async () => {
    if (productId === null) {
      if (isMountedRef.current) {
        setProduct(null);
        setErrorMessage("The product ID is invalid.");
        setIsLoading(false);
      }
      return;
    }

    if (isMountedRef.current) {
      setIsLoading(true);
      setErrorMessage(null);
    }

    try {
      const productResponse = await fetchProductById(productId);

      if (!isMountedRef.current) {
        return;
      }

      setProduct(productResponse);
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
  }, [productId]);

  useEffect(() => {
    isMountedRef.current = true;
    void loadProduct();

    return () => {
      isMountedRef.current = false;
    };
  }, [loadProduct]);

  return {
    product,
    isLoading,
    errorMessage,
    reload: loadProduct,
  };
}
