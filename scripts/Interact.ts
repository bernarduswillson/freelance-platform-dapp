import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Interacting with contract:", deployer.address);

  const lockAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const Lock = await ethers.getContractAt("Lock", lockAddress);

  const balance = await ethers.provider.getBalance(lockAddress);
  console.log("Contract balance:", ethers.formatEther(balance), "ETH");
}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});