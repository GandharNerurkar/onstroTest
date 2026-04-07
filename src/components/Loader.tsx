import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { colors } from '../utils/theme';

function LoaderComponent() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.accent} size="large" />
    </View>
  );
}

export const Loader = memo(LoaderComponent);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
