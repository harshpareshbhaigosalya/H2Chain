require("dotenv").config();
const { ethers } = require("ethers");
const hre = require("hardhat");

async function main() {
  // Compile contracts if needed
  await hre.run("compile");

  // Get the contract factory
  const HydrogenCredit = await hre.ethers.getContractFactory("HydrogenCredit");

  console.log("Deploying HydrogenCredit contract...");

  // Deploy contract
  const hydrogenCredit = await HydrogenCredit.deploy();

  // Wait for deployment to be mined
  await hydrogenCredit.waitForDeployment();

  console.log("HydrogenCredit deployed to:", hydrogenCredit.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
