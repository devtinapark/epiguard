export const contractConstants = {
  contractAddress: '0x06dde6796e0a867076e71a46b5f6dcd1a2bb3b149b3f99635fc91f59a0e89de3',
  abi: [
    {
      "name": "EpiGuardImplementation",
      "type": "impl",
      "interface_name": "EpiGuard::EpiGuard::IEpiGuardImplementation"
    },
    {
      "name": "core::bool",
      "type": "enum",
      "variants": [
        {
          "name": "False",
          "type": "()"
        },
        {
          "name": "True",
          "type": "()"
        }
      ]
    },
    {
      "name": "EpiGuard::EpiGuard::TestData",
      "type": "struct",
      "members": [
        {
          "name": "id",
          "type": "core::integer::u128"
        },
        {
          "name": "test",
          "type": "core::bool"
        },
        {
          "name": "time",
          "type": "core::integer::u64"
        },
        {
          "name": "used",
          "type": "core::bool"
        }
      ]
    },
    {
      "name": "EpiGuard::EpiGuard::IEpiGuardImplementation",
      "type": "interface",
      "items": [
        {
          "name": "get_current_owner",
          "type": "function",
          "inputs": [],
          "outputs": [
            {
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "get_testData",
          "type": "function",
          "inputs": [
            {
              "name": "positiveUser",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "id",
              "type": "core::integer::u128"
            }
          ],
          "outputs": [
            {
              "type": "EpiGuard::EpiGuard::TestData"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "get_GlobalId",
          "type": "function",
          "inputs": [],
          "outputs": [
            {
              "type": "core::integer::u128"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "get_Contact",
          "type": "function",
          "inputs": [
            {
              "name": "user",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [
            {
              "type": "core::bool"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "get_usersId",
          "type": "function",
          "inputs": [
            {
              "name": "user",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [
            {
              "type": "core::integer::u128"
            }
          ],
          "state_mutability": "view"
        },
        {
          "name": "send_Test",
          "type": "function",
          "inputs": [
            {
              "name": "user",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "send_Contact",
          "type": "function",
          "inputs": [
            {
              "name": "id",
              "type": "core::integer::u128"
            },
            {
              "name": "usersToSend",
              "type": "core::array::Array::<core::starknet::contract_address::ContractAddress>"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "name": "change_Owner",
          "type": "function",
          "inputs": [
            {
              "name": "new_Owner",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        }
      ]
    },
    {
      "name": "constructor",
      "type": "constructor",
      "inputs": [
        {
          "name": "init_owner",
          "type": "core::starknet::contract_address::ContractAddress"
        }
      ]
    },
    {
      "kind": "enum",
      "name": "EpiGuard::EpiGuard::EpiGuard::Event",
      "type": "event",
      "variants": []
    }
  ]
};
