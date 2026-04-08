import React, { memo, useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import type { SortOption } from '../types/filter';
import { colors, radius, spacing } from "../constants/theme";

const SORT_LABELS: Record<SortOption, string> = {
  PRICE_ASC: 'Price: Low to High',
  PRICE_DESC: 'Price: High to Low',
  NAME_ASC: 'Name: A to Z',
  NAME_DESC: 'Name: Z to A',
};

interface SortSelectorProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

function SortSelectorComponent({ value, onChange }: SortSelectorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const selectedLabel = useMemo(() => SORT_LABELS[value], [value]);

  const handleSelect = (sortOption: SortOption) => {
    onChange(sortOption);
    setIsVisible(false);
  };

  return (
    <>
      <Pressable style={styles.trigger} onPress={() => setIsVisible(true)}>
        <Text style={styles.triggerLabel}>Sort</Text>
        <Text style={styles.triggerValue} numberOfLines={1}>
          {selectedLabel}
        </Text>
      </Pressable>

      <Modal animationType="fade" transparent visible={isVisible} onRequestClose={() => setIsVisible(false)}>
        <Pressable style={styles.overlay} onPress={() => setIsVisible(false)}>
          <View style={styles.sheet}>
            {Object.entries(SORT_LABELS).map(([key, label]) => {
              const sortOption = key as SortOption;
              const isSelected = sortOption === value;

              return (
                <Pressable
                  key={sortOption}
                  style={[styles.option, isSelected && styles.optionSelected]}
                  onPress={() => handleSelect(sortOption)}>
                  <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

export const SortSelector = memo(SortSelectorComponent);

const styles = StyleSheet.create({
  trigger: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  triggerLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  triggerValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    rowGap: spacing.sm,
    width: '100%',
  },
  option: {
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  optionSelected: {
    backgroundColor: colors.accentMuted,
  },
  optionLabel: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '500',
  },
  optionLabelSelected: {
    color: colors.accent,
  },
});
