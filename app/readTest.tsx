import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { useAccount, useContractRead } from "@starknet-react/core";
import { AppContext } from './_layout';
import { contractConstants } from './contractConstants';

const contractAddress = contractConstants.contractAddress;
const abi = contractConstants.abi;

export default function ReadTest() {
  const { setReadRequested, infected, setInfected, address: currentAddress, setAddress: setCurrentAddress } = useContext(AppContext);

  const { address } = useAccount();
  const [functionName, setFunctionName] = useState<string>("get_current_owner");
  const [args, setArgs] = useState<any[]>([]);

  const { data, isError, isLoading, error } = useContractRead({
    functionName,
    args,
    abi,
    address: contractAddress,
    watch: true,
  });

  const handleButtonPress = (name: string, args: any[] = []) => {
    setFunctionName(name);
    setArgs(args);
  };

  useEffect(() => {
    if (functionName && args.length > 0 && !isLoading && data?.test !== undefined) {
      setInfected({ isInfected: data.test, verifiedAt: data.time });
      setReadRequested(true);
      console.log('data.test data.time', data.test, data.time);
    }
  }, [data, isLoading, functionName, args]);

  if (isLoading) return <Text>Loading ...</Text>;
  if (isError) return <Text>{error.message}</Text>;

  return (
    <View>
      <Button
        onPress={() => handleButtonPress("get_testData", [currentAddress, 1])}
        title="Get Test Data"
      />
    </View>
  );
}
