import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { VStack } from "@/components/ui/vstack";
import "@/global.css";

export default function RootLayout() {
  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
    unsavedChangesWarning: false,
  });

  return (
    <GluestackUIProvider mode="dark">
      <ConvexProvider client={convex}>
        <VStack className="flex-1 bg-background p-4">
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" },
            }}
          >
            <Stack.Screen name="(tabs)" />
          </Stack>
        </VStack>
      </ConvexProvider>
    </GluestackUIProvider>
  );
}
