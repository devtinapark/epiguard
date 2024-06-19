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
  infected: boolean;
  setInfected: React.Dispatch<React.SetStateAction<boolean>>;
  exposed: boolean;
  setExposed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppState>({
  connected: false,
  setConnected: () => { },
  infected: false,
  setInfected: () => { },
  exposed: false,
  setExposed: () => { },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [connected, setConnected] = useState<boolean>(false);
  const [infected, setInfected] = useState<boolean>(false);
  const [exposed, setExposed] = useState<boolean>(false);

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
