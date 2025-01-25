import { HardhatUserConfig } from "hardhat/config";  
import "dotenv/config";  
import "@nomicfoundation/hardhat-toolbox";  
  
const { API_URL, PRIVATE_KEY } = process.env;  
  
const config: HardhatUserConfig = {
  solidity: {  
    version: "0.8.28",  
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
      viaIR: true,
    },
  },
};  
   
if (API_URL && PRIVATE_KEY) {  
  config.defaultNetwork = "sepolia";  
  config.networks = {  
    hardhat: {},  
    sepolia: {  
      url: API_URL,  
      accounts: [`0x${PRIVATE_KEY}`],  
    },  
  };  
}  
  
export default config;  
