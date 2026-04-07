import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { ProductDetailScreen } from "../screens/ProductDetailScreen";
import { ProductListScreen } from "../screens/ProductListScreen";
import type { RootStackParamList } from "../types/navigation";
import { colors } from "../utils/theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    border: colors.border,
    primary: colors.accent,
    text: colors.textPrimary,
  },
};

const screenOptions = {
  headerBackTitleVisible: false,
  headerShadowVisible: false,
  headerTitleStyle: {
    fontWeight: "700" as const,
  },
  contentStyle: {
    backgroundColor: colors.background,
  },
};

export function AppNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{ title: "Products" }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: "Product Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
