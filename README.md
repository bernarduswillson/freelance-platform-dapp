# Freelance Platform dApp

1. Clone the repository
```shell
git clone https://github.com/bernarduswillson/freelance-platform-dapp.git
```
2. Install dependencies
```shell
npm install
```
3. Compile the contracts
```shell
npx hardhat compile
```

## Deploy and test the project on Local Network
1. Start the blockchain network locally
```shell
npx hardhat node
```
2. Deploy "HelloWorld" contract to the local network
```shell
npx hardhat ignition deploy ./ignition/modules/HelloWorld.ts
```
3. Interact with the contract (check balance)
```shell
npx hardhat run scripts/HelloWorld.ts --network localhost
```

## Deploy and test the project on Remote Network
1. Create a `.env` file in the root directory and add the following content
```shell
API_KEY=<API_KEY>
PRIVATE_KEY=<PRIVATE_KEY>
```
2. Deploy "HelloWorld" contract to the remote network
```shell
npx hardhat ignition deploy ./ignition/modules/HelloWorld.ts --network <network>
```
3. Interact with the contract (check balance)
```shell
npx hardhat run scripts/HelloWorld.ts --network <network>
```
