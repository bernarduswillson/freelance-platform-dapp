import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const FreelanceModule = buildModule("FreelanceModule", (m) => {
  const freelance = m.contract("Freelance", []);
  return { freelance };
});

export default FreelanceModule;