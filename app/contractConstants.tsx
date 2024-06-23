export const contractConstants = {
  contractAddress: '0x05d0adf3610d5dc16a331337594a525a5266ba1af6f093956a3a6f05ed1f0abd',
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
        "name": "get_usersId",
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
            "name": "users",
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
    "kind": "struct",
    "name": "EpiGuard::EpiGuard::EpiGuard::Contact",
    "type": "event",
    "members": [
      {
        "kind": "key",
        "name": "id",
        "type": "core::integer::u128"
      },
      {
        "kind": "data",
        "name": "positiveUser",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "time",
        "type": "core::integer::u64"
      },
      {
        "kind": "data",
        "name": "afectedUsers",
        "type": "core::array::Array::<core::starknet::contract_address::ContractAddress>"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "EpiGuard::EpiGuard::EpiGuard::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "Contact",
        "type": "EpiGuard::EpiGuard::EpiGuard::Contact"
      }
    ]
  }
]
};
