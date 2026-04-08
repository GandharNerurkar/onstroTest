import React, { memo } from 'react';
import { FlatList, ListRenderItem, Pressable, StyleSheet, Text } from 'react-native';

import type { ProductCategory } from '../types/product';
import { colors, radius, spacing } from "../constants/theme";

interface CategoryFilterProps {
  categories: ProductCategory[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

interface CategoryItem {
  key: string;
  label: string;
  value: string | null;
}

function CategoryFilterComponent({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const items: CategoryItem[] = [{ key: 'all', label: 'All', value: null }, ...categories.map((category) => ({
    key: category,
    label: category,
    value: category,
  }))];

  const renderItem: ListRenderItem<CategoryItem> = ({ item }) => {
    const isSelected = item.value === selectedCategory;

    return (
      <Pressable
        style={[styles.chip, isSelected && styles.chipSelected]}
        onPress={() => onSelectCategory(item.value)}>
        <Text style={[styles.chipLabel, isSelected && styles.chipLabelSelected]}>{item.label}</Text>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      horizontal
      keyExtractor={(item) => item.key}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
}

export const CategoryFilter = memo(CategoryFilterComponent);

const styles = StyleSheet.create({
  listContent: {
    columnGap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  chip: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  chipSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  chipLabel: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  chipLabelSelected: {
    color: colors.surface,
  },
});
