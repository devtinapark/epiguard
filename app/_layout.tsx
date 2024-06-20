import React, { createContext, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
interface AppState {
  connected: boolean;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
  infected: {
    isInfected: boolean;
    infectedAt?: number; // timestamp
    verifiedAt?: number; // timestamp
    verifiedBy?: string;
  };
  setInfected: React.Dispatch<React.SetStateAction<{
    isInfected: boolean;
    infectedAt?: number | undefined;
    verifiedAt?: number | undefined;
    verifiedBy?: string | undefined;
  }>>;
  exposed: {
    isExposed: boolean;
    notifiedAt?: number; // timestamp
    exposedCode?: number; // added exposedCode property
  };
  setExposed: React.Dispatch<React.SetStateAction<{
    isExposed: boolean;
    notifiedAt?: number | undefined;
    exposedCode?: number | undefined; // added exposedCode property
  }>>;
}

export const AppContext = createContext<AppState>({
  connected: false,
  setConnected: () => { },
  infected: {
    isInfected: false,
  },
  setInfected: () => { },
  exposed: {
    isExposed: false,
  },
  setExposed: () => { },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [connected, setConnected] = useState<boolean>(false);
  const [infected, setInfected] = useState<{
    isInfected: boolean;
    infectedAt?: number;
    verifiedAt?: number;
    verifiedBy?: string;
  }>({
    isInfected: false,
  });
  const [exposed, setExposed] = useState<{
    isExposed: boolean;
    notifiedAt?: number;
    exposedCode?: number;
  }>({
    isExposed: false,
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
    <AppContext.Provider
      value={{
        connected,
        setConnected,
        infected,
        setInfected,
        exposed,
        setExposed,
      }}
    >
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </AppContext.Provider>
  );
}
