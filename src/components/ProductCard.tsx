import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import type { Product } from '../types/product';
import { formatPrice } from '../utils/formatters';
import { colors, radius, spacing } from "../constants/theme";

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

const BLURHASH_PLACEHOLDER = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

function ProductCardComponent({ product, onPress }: ProductCardProps) {
  return (
    <Pressable style={styles.card} onPress={() => onPress(product)}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        contentFit="contain"
        transition={200}
        placeholder={BLURHASH_PLACEHOLDER}
        cachePolicy="memory-disk"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
      </View>
    </Pressable>
  );
}

export const ProductCard = memo(ProductCardComponent);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 3,
  },
  image: {
    backgroundColor: colors.surfaceMuted,
    height: 220,
    width: '100%',
  },
  content: {
    gap: spacing.sm,
    padding: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  price: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: '700',
  },
});
