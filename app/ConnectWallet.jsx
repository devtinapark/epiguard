import React, { useContext, useEffect, useState } from "react";
import {
  useConnect,
  useDisconnect,
  useAccount,
  useBalance,
} from "@starknet-react/core";
import { StyleSheet, Image, Platform } from 'react-native';
import { AppContext } from "./_layout";

export default function ConnectWallet() {
  const { connect, connectors } = useConnect();
  const { connected, setConnected, setReadRequested, address: currentAddress, setAddress: setCurrentAddress } = useContext(AppContext);
  const { account, status, address } = useAccount();
  const { disconnect } = useDisconnect();
  const [balanceFetched, setBalanceFetched] = useState(false);

  const { isLoading, isError, error, data } = useBalance({
    address,
    watch: true,
  });

  // Effect to log status, address, and account upon initial connection
  useEffect(() => {
    if (status === "connected" && account && address) {
      setCurrentAddress(address);
      console.log("Connected:", { address, status, account });
    } else {
      setCurrentAddress('');
    }
  }, [status, account, address]);

  // Effect to log balance once fetched
  useEffect(() => {
    if (!isLoading && address && !balanceFetched) {
      handleBalance();
    }
  }, [isLoading, address, data, isError]);


  useEffect(() => {
    if (status !== "connected") {
      setReadRequested(false);
      console.log("disconnected, setreadrequested false");
    }
  }, [status, account, address]);

  const handleConnect = async (connector) => {
    try {
      await connect({ connector });
      setConnected(true); // Update connected state in context
      setBalanceFetched(false); // Reset balance fetched state
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleBalance = () => {
    if (isLoading) {
      console.log("Balance is loading...");
    } else if (isError || !data) {
      console.error("Error fetching balance:", error?.message || "Unknown error");
    } else {
      console.log("Balance:", data.value.toString(), data.symbol);
      setBalanceFetched(true); // Set balance fetched state
    }
  };

  if (status === "disconnected") {
    return (
      <>
        <ul style={styles.ulBox}>
          {connectors.map((connector) => (
            <li styes={styles.liBox} key={connector.id}>
              <button style={styles.buttonText} onClick={() => handleConnect(connector)}>
                Connect Wallet
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <button style={styles.buttonText} onClick={() => disconnect()}>
        Disconnect
      </button>
    </>
  );
}

const styles = StyleSheet.create({
ulBox: {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  backgroundColor: 'transparent',
},
  liBox: {
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
  },
disconnectButton: {
  backgroundColor: '#841584', // Tomato color for disconnect button
  },
buttonText: {
  padding: 8,
  border: 'none',
  position: 'absolute',
  right: 8,
  top: 8,
  zIndex: 999,
  color: '#ffffff', // White text color
  fontSize: 16,
  fontWeight: 'bold',
  backgroundColor: '#841584', // Purple color
  borderRadius: 8,
  marginBottom: 15,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 3, // Android shadow
  shadowColor: '#000', // iOS shadow
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.4,
  shadowRadius: 2,
  },
});
