import { ethers } from "hardhat";
import { Freelance } from "../typechain-types"
import readline from "readline";  
  
async function main() {  
  const rl = readline.createInterface({  
    input: process.stdin,  
    output: process.stdout  
  });  
  
  const contractAddress = "0x6EcD41c69ccF1530Ae8B2e98c1fba81ff9FB1FEb";
  
  // // Prompt user for input  
  // const jobTitle = await askQuestion(rl, "Enter the job title: ");  
  // const description = await askQuestion(rl, "Enter the job description: ");  
  // const agreements = await askQuestion(rl, "Enter the job agreements: ");  
  // const deadline = parseInt(await askQuestion(rl, "Enter the deadline (Unix timestamp): ") as string, 10);  
  // const freelancerAddress = await askQuestion(rl, "Enter the freelancer's address: ");  
  // const paymentAmount = hre.ethers.parseEther(await askQuestion(rl, "Enter the guarantee amount (in ETH): "));  

  // Hardcoded input
  const input = {
    jobTitle: "Build a website",
    description: "Build a website for my business",
    agreements: "Website should be usable on both desktop and mobile devices",
    deadline: 1737878362,
    freelancerAddress: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
    paymentAmount: ethers.parseEther("1")
  };
  const { jobTitle, description, agreements, deadline, freelancerAddress, paymentAmount } = input;
  
  rl.close();  
  
  const Freelance = await ethers.getContractFactory("Freelance");
  const [client] = await ethers.getSigners();
   
  const freelanceContract = Freelance.attach(contractAddress) as Freelance;  
  console.log("Interacting with Freelance contract at:", freelanceContract.target);
  console.log("Interacting with contract using account:", client.address);  
  
  // Create contract  
  try {  
    const tx = await freelanceContract.createContract(  
      jobTitle,  
      description,  
      agreements,  
      deadline,  
      freelancerAddress,  
      paymentAmount,  
      { value: paymentAmount }  
    );  
  
    console.log("Transaction sent. Waiting for confirmation...");  
  
    await tx.wait();  
  
    console.log("Contract created successfully with transaction hash:", tx.hash);  
  } catch (error) {  
    if (error instanceof Error) {
      console.error("Error creating contract:", error.message);
    } else {
      console.error("Error creating contract:", error);
    }
  }  
}  
  
function askQuestion(rl: { question: (arg0: any, arg1: (value: unknown) => void) => void; }, question: string) {  
  return new Promise(resolve => rl.question(question, resolve));  
}  
  
main()  
  .then(() => process.exit(0))  
  .catch((error) => {  
    console.error(error);  
    process.exit(1);  
  });  
