import { Image } from "expo-image";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import type { Product } from "../types/product";
import { formatPrice } from "../utils/formatters";
import { colors, radius, spacing } from "../utils/theme";

interface ProductDetailScreenProps {
  product: Product;
}

const BLURHASH_PLACEHOLDER = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";

export function ProductDetailScreen({ product }: ProductDetailScreenProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="contain"
          transition={200}
          placeholder={BLURHASH_PLACEHOLDER}
          cachePolicy="memory-disk"
        />
      </View>

      <View style={styles.summary}>
        <Text style={styles.category}>{product.category}</Text>
        <Text
          style={styles.rating}
        >{`Rating: ${product.rating.rate} (${product.rating.count} reviews)`}</Text>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
    padding: spacing.xl,
  },
  image: {
    height: 320,
    width: "100%",
  },
  summary: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    gap: spacing.sm,
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  category: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
  },
  price: {
    color: colors.accent,
    fontSize: 28,
    fontWeight: "800",
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  rating: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "500",
  },
  description: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
});
