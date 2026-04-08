import { useLocalSearchParams } from "expo-router";
import React from "react";

import { FeedbackState } from "../../src/components/FeedbackState";
import { Loader } from "../../src/components/Loader";
import { useProductDetail } from "../../src/hooks/useProductDetail";
import { ProductDetailScreen } from "../../src/screens/ProductDetailScreen";

export default function ProductDetailRoute() {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const rawProductId = Array.isArray(params.id) ? params.id[0] : params.id;
  const productId = rawProductId ? Number(rawProductId) : null;
  const normalizedProductId =
    productId !== null && Number.isFinite(productId) ? productId : null;
  const { product, isLoading, errorMessage, reload } =
    useProductDetail(normalizedProductId);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return (
      <FeedbackState
        title="Unable to load product"
        message={errorMessage}
        actionLabel="Try Again"
        onActionPress={() => {
          void reload();
        }}
      />
    );
  }

  if (!product) {
    return (
      <FeedbackState
        title="Product not found"
        message="This product could not be found."
      />
    );
  }

  return <ProductDetailScreen product={product} />;
}
