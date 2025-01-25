import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Interacting with contract using account:", deployer.address);

  // This is the address of a sample contract deployed on the Sepolia testnet. You can replace it with the address of other contracts.
  const contractAddress = "0x6EcD41c69ccF1530Ae8B2e98c1fba81ff9FB1FEb";

  if (!ethers.isAddress(contractAddress)) {  
    console.error("Invalid address provided:", contractAddress);  
    process.exit(1);  
  }  

  const balance = await ethers.provider.getBalance(contractAddress);
  console.log("Contract balance:", ethers.formatEther(balance), "ETH");
}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});