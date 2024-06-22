import React, { useContext, useEffect } from "react";
import {
  useConnect,
  useDisconnect,
  useAccount,
  useBalance,
} from "@starknet-react/core";
import { AppContext } from "./_layout";

export default function ConnectWallet() {
  const { connect, connectors } = useConnect();
  const { setConnected } = useContext(AppContext);
  const { account, status, address, onConnect } = useAccount();
  const { isLoading, isError, error, data } = useBalance({
    address,
    watch: true,
  });

  // Effect to log status, address, and account upon initial connection
  useEffect(() => {
    if (status === "connected" && account && address) {
      console.log("Connected:", { address, status, account });
    }
  }, [status, account, address]);

  const handleConnect = async (connector) => {
    try {
      await connect({ connector });
      setConnected(true); // Update connected state in context
      if (onConnect) {
        onConnect({ address, connector }); // Invoke onConnect callback if provided
      }
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
    }
  };

  const { disconnect } = useDisconnect();

  if (status === "disconnected") {
    return (
      <>
        <ul>
          {connectors.map((connector) => (
            <li key={connector.id}>
              <button onClick={() => handleConnect(connector)}>
                Connect with {connector.name}
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <button onClick={() => disconnect()}>
        Disconnect
      </button>
      {/* <button onClick={() => handleBalance()}>
        Handle Balance
      </button> */}
    </>
  );
}
