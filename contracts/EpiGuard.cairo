use starknet::ContractAddress;
use array::ArrayTrait;

#[derive(Drop, Serde, starknet::Store)]
    struct TestData {
        id: u128,
        test: bool,
        time: u64,
        used: bool,
    }

#[starknet::interface]
trait IEpiGuardImplementation<TContractState> {
    fn get_current_owner(self: @TContractState) -> ContractAddress;
    fn get_testData(self: @TContractState, positiveUser: ContractAddress, id: u128) -> TestData;
    fn get_GlobalId(self: @TContractState) -> u128;
    fn get_Contact(self: @TContractState, user: ContractAddress) -> bool;
    fn get_usersId(self: @TContractState, user: ContractAddress) -> u128;



    fn send_Test(ref self: TContractState, user: ContractAddress);
    fn send_Contact(ref self: TContractState, id: u128, usersToSend: Array<ContractAddress>);
    fn change_Owner(ref self: TContractState, new_Owner: ContractAddress);

}


#[starknet::contract]
mod EpiGuard {

    //libraries
    use super::ContractAddress;
    use starknet::get_caller_address;
    use super::ArrayTrait;
    use starknet::contract_address_const;
    use zeroable::Zeroable;
    use super::IEpiGuardImplementation;
    use super::TestData;
    use starknet::get_block_timestamp;

    //structs
    //Storage variables
    #[storage]
    struct Storage {
        // State variable
        GlobalId: u128,
        owner: ContractAddress,
        //Mappings
        users: LegacyMap::<(ContractAddress, u128), TestData>,
        usersId : LegacyMap::<ContractAddress, u128>,
        currentContact: LegacyMap::<ContractAddress, TestData>,
    }

    #[constructor]
    fn constructor(ref self: ContractState, init_owner: ContractAddress) {
        assert(!init_owner.is_zero(), 'Owner zero address');
        self.owner.write(init_owner);
    }

    #[abi(embed_v0)]
    impl EpiGuardImplementation of IEpiGuardImplementation<ContractState> {

        fn get_current_owner(self: @ContractState) -> ContractAddress {
            return self.owner.read();
        }

        fn get_GlobalId(self: @ContractState) -> u128 {
            return self.GlobalId.read();
        }

        fn get_testData(self: @ContractState, positiveUser: ContractAddress, id: u128) -> TestData {
           return self.users.read((positiveUser, id));
        }

        fn get_usersId(self: @ContractState, user: ContractAddress) -> u128 {
            return self.usersId.read(user);
        }

        fn get_Contact(self: @ContractState, user: ContractAddress)-> bool {
            let userData = self.currentContact.read(user);
            let userSaved_data: TestData = userData;

            assert(userSaved_data.time != 0, 'No data');

            if(userSaved_data.time < get_block_timestamp() + 604800) {
                return true;
            } else {
                return false;
            }
        }

        fn send_Test(ref self: ContractState, user: ContractAddress) {

            let caller = get_caller_address();

            assert(caller == self.owner.read(), 'Not Owner');
            //actualize GlobalId
            let current_global_id = self.GlobalId.read();
            let new_global_id = current_global_id + 1;
            self.GlobalId.write(new_global_id);

            let testData = TestData {
                id: new_global_id,
                test: true,
                time: get_block_timestamp(),
                used: false
            };


            self.users.write((user, new_global_id), testData);
            self.usersId.write(user, new_global_id);

        }

        fn send_Contact(ref self: ContractState, id: u128, usersToSend: Array::<ContractAddress>) {
            let data = self.users.read((self.owner.read(), id));
            let saved_data: TestData = data;

            assert(saved_data.time != 0, 'No data');
            assert(saved_data.time + 604800  > get_block_timestamp(), 'Time out of range');
            assert(saved_data.used == false, 'Id already used');

            let len = usersToSend.len();

            //Actualize data
            let actualizedData = TestData {
                id: id,
                test: true,
                time: saved_data.time,
                used: true
            };

            self.users.write((self.owner.read(), id), actualizedData);



            //Notify users
            let mut i = 0;

            while i < len {

                let actualizedDataUsersAfected = TestData {
                id: id,
                test: true,
                time: saved_data.time,
                used: true
                };

                self.currentContact.write(*usersToSend.at(i), actualizedDataUsersAfected);

                i = i + 1;
            };

        }

        fn change_Owner(ref self: ContractState, new_Owner: ContractAddress) {
            let caller = get_caller_address();

            assert(!new_Owner.is_zero(), 'Owner zero address');
            assert(caller == self.owner.read(), 'Not Owner');

            self.owner.write(new_Owner);
        }


    }
}
