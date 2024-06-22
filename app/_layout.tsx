import React, { createContext, useState, useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/hooks/useColorScheme';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  argent,
  useInjectedConnectors,
  voyager,
} from "@starknet-react/core";
import ConnectWallet from './ConnectWallet';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

interface Encounter {
  encounteredAddress: string;
  encounteredAt: number; // timestamp
}

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
  encounters: Encounter[];
  setEncounters: React.Dispatch<React.SetStateAction<Encounter[]>>;
}

const firebaseConfig = {
  apiKey: "AIzaSyBf_Cq84EzVD-pZBPXLpTPQtLzaAM0wNzk",
  authDomain: "epiguard-42198.firebaseapp.com",
  projectId: "epiguard-42198",
  storageBucket: "epiguard-42198.appspot.com",
  messagingSenderId: "258404406244",
  appId: "1:258404406244:web:32066a7e4c41892313edf1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const connectWallet = async () => {
//   const { wallet } = await connect({ webWalletUrl: "https://web.argent.xyz" })

//   if (wallet && wallet.isConnected) {
//     console.log('connected. wallet:', wallet);
//     // setConnection(wallet)
//     // setProvider(wallet.account)
//     // setAddress(wallet.selectedAddress)
//   }
// }


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
  encounters: [],
  setEncounters: () => { },
});

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const chains = [sepolia];
  const provider = publicProvider();
  const { connectors } = useInjectedConnectors({
    // Show these connectors if the user has no connector installed.
    recommended: [
      argent(),
    ],
    // Hide recommended connectors if the user has any connector installed.
    includeRecommended: "onlyIfNoConnectors",
    // Randomize the order of the connectors.
    order: "random"
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

  const [encounters, setEncounters] = useState<Encounter[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Encounters"));
        const encountersData: Encounter[] = [];

        querySnapshot.forEach((doc) => {
          const { encounteredAddress, encounteredAt } = doc.data();
          encountersData.push({ encounteredAddress, encounteredAt });
        });

        setEncounters(encountersData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (loaded) {
      fetchData();
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
        encounters,
        setEncounters,
      }}
    >
      <StarknetConfig
        chains={chains}
        provider={provider}
        connectors={connectors}
        explorer={voyager}
        >
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <ConnectWallet />
          <Stack>
            {/* Your navigation stack screens */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </StarknetConfig>
    </AppContext.Provider>
  );
};

export default RootLayout;
