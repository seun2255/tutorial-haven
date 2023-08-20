import { ethers } from "ethers";
import CONTRACT from "../contracts/TutorialHaven.json";
import TOKENCONTRACT from "../contracts/Haven.json";
import { uploadNewVideo, getUserDetails } from "./database";

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_ID;

const network = "xdcTestnet";

const getSigner = async () => {
  // const provider = new ethers.AlchemyProvider(ethers, alchemyApiKey);
  const provider = new ethers.JsonRpcProvider("http://localhost:8545");
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
    CONTRACT.abi,
    signer
  );
  return contract;
};

const uploadVideo = async (title, description, url, thumbnail, tags) => {
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
    tags
  ).then(() => {
    console.log("Video Uploaded");
  });
};

export { uploadVideo };
