import React, { useState, useEffect, useContext, useMemo } from 'react';
import { View, Text, Button } from 'react-native';
import { useAccount, useContractRead, useContractWrite, useNetwork, useContract } from "@starknet-react/core";
import { AppContext } from './_layout';
import { contractConstants } from './contractConstants';

const contractAddress = contractConstants.contractAddress;
const vitalikAddress = "0xe0f0b547949656061405b79c89c4c44f4a711e27578f7bd2f74152da59545f";
const abi = contractConstants.abi;

export default function Component() {
  const { address: currentAddress, setAddress: setCurrentAddress } = useContext(AppContext);
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { contract } = useContract({
    abi: abi,
    address: contractAddress,
  });

  const calls = useMemo(() => {
    if (!address || !contract) return [];
    return contract.populateTransaction["send_Test"]!(vitalikAddress);
  }, [contract, address]);


  const {
    writeAsync,
    data,
    isPending,
  } = useContractWrite({
    calls,
  });

  // const [functionName, setFunctionName] = useState<string>("get_current_owner");
  // const [args, setArgs] = useState<any[]>([]);

  // const { data, isError, isLoading, error } = useContractRead({
  //   functionName,
  //   args,
  //   abi,
  //   address: contractAddress,
  //   watch: true,
  // });

  const handleButtonPress = () => {
    writeAsync()
    // setFunctionName(name);
    // setArgs(args);
    console.log(data);
  };

  // if (isLoading) return <Text>Loading ...</Text>;
  // if (isError) return <Text>{error.message}</Text>;

  return (
    <View>
      <Button
        onPress={() => handleButtonPress()}
        title="Send Test"
      />
    </View>
  );
}
