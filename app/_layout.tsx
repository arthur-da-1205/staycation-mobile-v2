import { useFonts } from "expo-font";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { NativeBaseProvider } from "native-base";

import { useColorScheme } from "@hooks/useColorScheme";
import { AppProvider, useApp } from "@provider/app.provider";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    // <PaperProvider>
    <NativeBaseProvider>
      <SafeAreaProvider>
        <AppProvider>
          {/* <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        > */}
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
          </Stack>
          {/* </ThemeProvider> */}
        </AppProvider>
      </SafeAreaProvider>
    </NativeBaseProvider>
    // </PaperProvider>
  );
}
