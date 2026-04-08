import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";

import { CategoryFilter } from "../components/CategoryFilter";
import { FeedbackState } from "../components/FeedbackState";
import { Loader } from "../components/Loader";
import { ProductCard } from "../components/ProductCard";
import { SearchBar } from "../components/SearchBar";
import { SortSelector } from "../components/SortSelector";
import { useDebounce } from "../hooks/useDebounce";
import { useProductCatalog } from "../hooks/useProductCatalog";
import type { ProductFilters } from "../types/filter";
import type { Product } from "../types/product";
import { applyProductFilters } from "../utils/productHelpers";
import { colors, spacing } from "../utils/theme";

const INITIAL_FILTERS: ProductFilters = {
  searchQuery: "",
  category: null,
  sortBy: "PRICE_ASC",
};

export function ProductListScreen() {
  const router = useRouter();
  const [filters, setFilters] = useState<ProductFilters>(INITIAL_FILTERS);
  const debouncedSearchQuery = useDebounce(filters.searchQuery, 400);
  const { products, categories, isLoading, errorMessage, reload } =
    useProductCatalog();

  const filteredProducts = useMemo(() => {
    return applyProductFilters(products, {
      ...filters,
      searchQuery: debouncedSearchQuery,
    });
  }, [debouncedSearchQuery, filters, products]);

  const handleSearchChange = useCallback((searchQuery: string) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      searchQuery,
    }));
  }, []);

  const handleSortChange = useCallback((sortBy: ProductFilters["sortBy"]) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      sortBy,
    }));
  }, []);

  const handleCategoryChange = useCallback((category: string | null) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      category,
    }));
  }, []);

  const handleProductPress = useCallback(
    (product: Product) => {
      router.push({
        pathname: "/products/[id]",
        params: { id: String(product.id) },
      });
    },
    [router],
  );

  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item }) => <ProductCard product={item} onPress={handleProductPress} />,
    [handleProductPress],
  );

  const keyExtractor = useCallback((item: Product) => String(item.id), []);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return (
      <FeedbackState
        title="Unable to load products"
        message={errorMessage}
        actionLabel="Try Again"
        onActionPress={() => {
          void reload();
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <SearchBar
          value={filters.searchQuery}
          onChangeText={handleSearchChange}
        />
        <SortSelector value={filters.sortBy} onChange={handleSortChange} />
        <CategoryFilter
          categories={categories}
          selectedCategory={filters.category}
          onSelectCategory={handleCategoryChange}
        />
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={8}
        windowSize={7}
        removeClippedSubviews
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <FeedbackState
            title="No results found"
            message="Try a different search, sort option, or category filter."
          />
        }
        ListHeaderComponent={
          <Text style={styles.resultCount}>
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  controls: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  listContent: {
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  resultCount: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "500",
    marginBottom: spacing.md,
  },
});
