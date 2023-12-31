import { ethers } from "ethers";
import CONTRACT from "../contracts/TutorialHaven.json";
import TOKENCONTRACT from "../contracts/Haven.json";
import {
  uploadNewVideo,
  getUserDetails,
  getUserData,
  createRequest,
} from "./database";

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
    window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x5",
          rpcUrls: [`https://eth-goerli.alchemyapi.io/v2/${alchemyApiKey}`], // Replace 'YOUR_INFURA_PROJECT_ID' with your Infura project ID
          chainName: "Goerli Testnet",
          nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
          },
          blockExplorerUrls: ["https://goerli.etherscan.io/"],
        },
      ],
    });

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
  duration,
  access,
  cost
) => {
  const contract = await getContract();
  const address = await getAddress();

  const author = await getUserDetails(address);

  const costAmount = ethers.parseEther(cost.toString());

  let txn = await contract.uploadVideo({
    title,
    description,
    url,
    thumbnail,
    author: author.username,
    paymentAddress: address,
    access,
    cost: costAmount,
  });
  await txn.wait();

  const filter = contract.filters.VideoUploaded();
  const events = await contract.queryFilter(filter, txn.blockNumber);

  console.log(events);
  const newItemId = events[events.length - 1].args.tokenId;
  console.log(newItemId);
  const itemId = newItemId.toString();
  console.log(newItemId.toString());
  const id = parseInt(itemId, 10);

  uploadNewVideo(
    id,
    title,
    description,
    url,
    thumbnail,
    author.username,
    author.profilePic,
    address,
    tags,
    duration,
    cost
  ).then(() => {
    console.log("Video Uploaded");
  });
};

const confirmAccess = async (address, token) => {
  const contract = await getContract();

  const allowed = await contract.checkAccess(token);
  return allowed;
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

  const etherAmount = ethers.parseEther(amount);

  // Call the function and pass Ether
  const tx = await contract.buyTokens({ value: etherAmount });

  // Wait for the transaction to be mined
  await tx.wait();
};

const sellTokens = async (amount) => {
  const contract = await getTokenContract();

  const tokenAmount = ethers.parseEther(amount);

  const tx = await contract.sellTokens(tokenAmount);

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

  const tokenAmount = ethers.parseEther(amount.toString());

  const tx = await contract.transfer(address, tokenAmount);

  await tx.wait();
};

const payForAccess = async (id, cost) => {
  const tokenContract = await getTokenContract();
  const contract = await getContract();

  const costAmount = ethers.parseEther(cost.toString());

  const approvalTx = await tokenContract.approve(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    costAmount
  );

  await approvalTx.wait();

  const payementTx = await contract.buyAccess(id);

  await payementTx.wait();

  return true;
};

const makeRequest = async (requestDetails, coin) => {
  const contract = await getTokenContract();
  const address = await getAddress();
  const signer = await getSigner();

  const rewardAmount = ethers.parseEther(requestDetails.reward.toString());

  if (coin === "xdc") {
    const transaction = await signer.sendTransaction({
      to: address,
      value: rewardAmount,
    });
    await transaction.wait();
  } else {
    const transaction = await contract.transfer(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      rewardAmount
    );
    await transaction.wait();
  }

  createRequest(requestDetails, address).then(() => {
    console.log("request created");
  });
};

export {
  uploadVideo,
  buyTokens,
  sellTokens,
  getTokenBalance,
  connect,
  sendXDC,
  sendHaven,
  confirmAccess,
  payForAccess,
  makeRequest,
};
