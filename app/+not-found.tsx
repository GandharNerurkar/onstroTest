import { Stack } from "expo-router";
import React from "react";

import { FeedbackState } from "../src/components/FeedbackState";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found" }} />
      <FeedbackState
        title="Page not found"
        message="The route you opened does not exist."
      />
    </>
  );
}
