const hre = require("hardhat");

async function main() {
  console.log("Deploying PasswordManager contract...");
  
  const PasswordManager = await hre.ethers.getContractFactory("PasswordManager");
  const passwordManager = await PasswordManager.deploy();
  
  await passwordManager.deployed();
  
  console.log("PasswordManager deployed to:", passwordManager.address);
  
  // Save deployment info
  const fs = require("fs");
  const deploymentInfo = {
    address: passwordManager.address,
    network: hre.network.name,
    deployer: (await hre.ethers.getSigners())[0].address,
    timestamp: new Date().toISOString(),
  };
  
  fs.writeFileSync(
    "./deployment.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("Deployment info saved to deployment.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
