const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deployers account:", deployer.address);

  //Token Contract
  const Haven = await ethers.getContractFactory("Haven");
  const myToken = await Haven.deploy();

  console.log("Token Successfully Deployed!");
  const tokenContract = await myToken.getAddress();
  console.log("Token address:", tokenContract);

  //Main Dapp Contract
  const TutorialHaven = await ethers.getContractFactory("TutorialHaven");
  const myNFT = await TutorialHaven.deploy(tokenContract);

  console.log("Contract Successfully Deployed!");
  const mainContract = await myNFT.getAddress();
  console.log("Contract address:", mainContract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
