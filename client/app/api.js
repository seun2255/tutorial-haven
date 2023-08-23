import { ethers } from "ethers";
import CONTRACT from "../contracts/TutorialHaven.json";
import TOKENCONTRACT from "../contracts/Haven.json";
import { uploadNewVideo, getUserDetails, getUserData } from "./database";

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
  // const provider = new ethers.providers.JsonRpcProvider({
  //   url: "https://rpc.apothem.network",
  // });

  // if (window.ethereum) {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     console.log("here 1");
  //     await provider.send("eth_requestAccounts", []);
  //     console.log("here 2");
  //     const signer = provider.getSigner();
  //     console.log("here 3");
  //     return signer;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // } else {
  //   console.error("BlocksPay is not detected in the browser");
  // }

  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // console.log("here 1");
  // const signer = provider.getSigner();
  // return signer;

  if (window.ethereum) {
    // const apothemChainId = "0x33"; // Chain ID for Apothem Testnet

    // // Check if the user is on the Apothem network
    // if (window.ethereum.chainId !== apothemChainId) {
    //   try {
    //     // Request the user to switch to the Apothem network
    //     await window.ethereum.request({
    //       method: "wallet_switchEthereumChain",
    //       params: [{ chainId: apothemChainId }],
    //     });
    //   } catch (error) {
    //     console.error("Failed to switch network:", error);
    //   }
    // }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return signer;
  } else {
    console.log("Wallet not detected.");
  }
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
  const address = await getAddress();
  data = await getUserData(address);
  return data;
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
  const contract = await getTokenContract();

  var ethBalance = await contract.getEthBalance();
  const ethBalanceWei = ethBalance.toString(); // Convert BigNumber to string

  const ethBalanceEther = ethers.formatEther(ethBalanceWei);

  const tokenBalance = await contract.balanceOf(address);
  const tokenBalanceWei = tokenBalance.toString(); // Convert BigNumber to string

  const tokenBalanceEther = ethers.formatEther(tokenBalanceWei);

  return {
    tokenBalanceEther,
    ethBalanceEther,
  };
};

const buyTokens = async (amount) => {
  const contract = await getTokenContract();

  console.log(amount);
  const etherAmount = ethers.parseEther(amount);

  // Call the function and pass Ether
  const tx = await contract.buyTokens({ value: etherAmount });

  // Wait for the transaction to be mined
  await tx.wait();
};

const sellTokens = async (amount) => {
  const contract = await getTokenContract();

  const tx = await contract.sellTokens(amount);

  await tx.wait();
};

const sendXDC = async (address, amount) => {
  const signer = await getSigner();

  const amountInWei = ethers.parseEther(amount.toString());

  const transaction = await signer.sendTransaction({
    to: address,
    value: amountInWei,
  });

  // Wait for the transaction to be confirmed
  const receipt = await transaction.wait();
};

const sendHaven = async (address, amount) => {
  const contract = await getTokenContract();

  const tx = await contract.transfer(address, amount);

  await tx.wait();
};

export {
  uploadVideo,
  buyTokens,
  sellTokens,
  getTokenBalance,
  connect,
  sendXDC,
  sendHaven,
};
