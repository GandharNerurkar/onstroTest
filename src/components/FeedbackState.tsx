import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from "../constants/theme";

interface FeedbackStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

function FeedbackStateComponent({
  title,
  message,
  actionLabel,
  onActionPress,
}: FeedbackStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onActionPress ? (
        <Pressable style={styles.button} onPress={onActionPress}>
          <Text style={styles.buttonLabel}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export const FeedbackState = memo(FeedbackStateComponent);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  message: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  buttonLabel: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '700',
  },
});
