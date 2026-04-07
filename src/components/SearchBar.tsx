import React, { memo } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { colors, radius, spacing } from '../utils/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

function SearchBarComponent({ value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search products"
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  );
}

export const SearchBar = memo(SearchBarComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
  },
  input: {
    color: colors.textPrimary,
    fontSize: 16,
    height: 48,
  },
});
