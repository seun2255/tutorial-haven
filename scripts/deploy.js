async function main() {
  const Haven = await ethers.getContractFactory("Haven");
  const myToken = await Haven.deploy("Haven", "HVN", 18, 1000);

  await myToken.deployed();

  const [deployer] = await ethers.getSigners();

  console.log("Deployers account:", deployer.address);
  console.log(
    "Deployers account balance:",
    (await deployer.getBalance()).toString()
  );

  console.log("Token Successfully Deployed!");
  console.log("Token address:", myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
