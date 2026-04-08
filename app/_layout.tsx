import "react-native-gesture-handler";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { colors } from "../src/utils/theme";

const screenOptions = {
  contentStyle: {
    backgroundColor: colors.background,
  },
  headerBackButtonDisplayMode: "minimal" as const,
  headerShadowVisible: false,
  headerTitleStyle: {
    fontWeight: "700" as const,
  },
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={screenOptions}>
        <Stack.Screen name="index" options={{ title: "Products" }} />
        <Stack.Screen
          name="products/[id]"
          options={{ title: "Product Details" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
