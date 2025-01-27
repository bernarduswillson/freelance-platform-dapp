import { ethers } from "hardhat";
import { Freelance } from "../typechain-types";

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const contractId = "0x62ab9206d6f3b1b62adf57e3a69b9ea22fe664f463e4e9aa722db90f727bf96f";

  const FreelanceFactory = await ethers.getContractFactory("Freelance");
  const freelanceContract = FreelanceFactory.attach(contractAddress) as Freelance;
  console.log("Interacting with Freelance contract at:", freelanceContract.target);

  // Get contract details by contract id
  try {
    const contractDetails = await freelanceContract.getContractDetails(contractId);
    console.log(`Found contract with id ${contractId}`);
    console.log(contractDetails);

  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching contract details:", error.message);
    } else {
      console.error("Error fetching contract details");
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });