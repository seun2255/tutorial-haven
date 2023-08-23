import { ethers } from "ethers";
import CONTRACT from "../contracts/TutorialHaven.json";
import TOKENCONTRACT from "../contracts/Haven.json";
import { uploadNewVideo, getUserDetails } from "./database";

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;

const network = "xdcTestnet";

const toFixed_norounding = (n, p) => {
  var result = n.toFixed(p);
  return result <= n ? result : (result - Math.pow(0.1, p)).toFixed(p);
};

/**
 * Blockchain Integration
 */

const getSigner = async () => {
  const provider = new ethers.JsonRpcProvider("https://rpc.apothem.network");
  const signer = await provider.getSigner();
  return signer;
};

const getAddress = async () => {
  const signer = await getSigner();
  return signer.address;
};

const getContract = async () => {
  const signer = await getSigner();
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    CONTRACT.abi,
    signer
  );
  return contract;
};

const getTokenContract = async () => {
  const signer = await getSigner();
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS,
    TOKENCONTRACT.abi,
    signer
  );
  return contract;
};

const connect = async () => {
  var data;
  const address = getAddress();
  console.log(address);
};

/**
 * Main Functions
 */

const uploadVideo = async (
  title,
  description,
  url,
  thumbnail,
  tags,
  duration
) => {
  const contract = await getContract();
  const address = await getAddress();

  const author = await getUserDetails(address);

  let txn = await contract.uploadVideo(
    title,
    description,
    url,
    thumbnail,
    author.username
  );
  await txn.wait();

  uploadNewVideo(
    title,
    description,
    url,
    thumbnail,
    author.username,
    author.profilePic,
    address,
    tags,
    duration
  ).then(() => {
    console.log("Video Uploaded");
  });
};

/**
 * Transaction Functions
 */

const getTokenBalance = async (address) => {
  const contract = await getContract();

  const balanceBigNumber = await contract.balanceOf(address);
  const balanceWei = balanceBigNumber.toString(); // Convert BigNumber to string

  const balanceEther = ethers.formatEther(balanceWei);
  console.log(balanceEther);

  return balanceEther;
};

const buyTokens = async (amount) => {
  const contract = await getTokenContract();

  console.log(amount);
  const etherAmount = ethers.parseEther(amount);

  // Call the function and pass Ether
  const tx = await contract.buyTokens({ value: etherAmount });

  // Wait for the transaction to be mined
  await tx.wait();

  console.log("Tokens bought successfully!");
};

const sellTokens = async (amount) => {
  const contract = await getTokenContract();

  const tx = await contract.sellTokens(amount);

  await tx.wait();
};

export { uploadVideo, buyTokens, sellTokens, getTokenBalance, connect };
