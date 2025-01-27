import { ethers } from "hardhat";
import { Freelance } from "../typechain-types";

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const FreelanceFactory = await ethers.getContractFactory("Freelance");
  const [client] = await ethers.getSigners();

  const freelanceContract = FreelanceFactory.attach(contractAddress) as Freelance;
  console.log("Interacting with Freelance contract at:", freelanceContract.target);
  console.log("Interacting with contract using account:", client.address);  

  // Get user contracts
  try {
    const freelancerContracts = await freelanceContract.getContractsAsFreelancer();
    console.log(`Found ${freelancerContracts.length} contracts as freelancer`);
    console.log(freelancerContracts);

    const clientContracts = await freelanceContract.getContractsAsClient();
    console.log(`Found ${clientContracts.length} contracts as client`);
    console.log(clientContracts);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching contracts:", error.message);
    } else {
      console.error("Error fetching contracts");
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });