import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { useAccount, useContractRead } from "@starknet-react/core";
import { AppContext } from './_layout';
import { contractConstants } from './contractConstants';

const contractAddress = contractConstants.contractAddress;
const abi = contractConstants.abi;

export default function Component() {
  const { infected, address: currentAddress, setAddress: setCurrentAddress } = useContext(AppContext);

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
    console.log(data);
  };

  if (isLoading) return <Text>Loading ...</Text>;
  if (isError) return <Text>{error.message}</Text>;

  return (
    <View>
      <Button
        onPress={() => {
          handleButtonPress("get_current_owner");
          console.log('infected sate', infected);
        }}
        title="Get Current Owner"
      />
      <Button
        onPress={() => handleButtonPress("get_testData", [currentAddress, 1])}
        title="Get Test Data"
      />
      <Button
        onPress={() => handleButtonPress("get_GlobalId")}
        title="Get Global Id"
      />
    </View>
  );
}


// export default function Component() {
//   const { address } = useAccount();

//   const { data, isError, isLoading, error } = useContractRead({
//     functionName: "get_current_owner",
//     args: [],
//     abi,
//     address: testAddress,
//     watch: true,
//   });

//   const handleButtonPress = () => {
//     console.log("Button pressed");
//     console.log(data);
//   };

//   if (isLoading) return <Text>Loading ...</Text>;
//   if (error) return <Text>{error.message}</Text>;

//   return (
//     <View>
//       <Button onPress={handleButtonPress} title="get_current_owner" />
//       <Button onPress={handleButtonPress} title="get_testData" />
//       <Button onPress={handleButtonPress} title="get_GlobalId" />
//     </View>
//   );
// }
