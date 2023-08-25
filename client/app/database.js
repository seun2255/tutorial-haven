import app from "@/firebase/firebaseApp";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { timeStamp } from "./utils/dateFunctions";
import { getTokenBalance } from "./api";

const db = getFirestore(app);

/**
 * Auth Functions
 */

//Checks if the User exists in the database
const checkIfUserExists = async (user) => {
  var data = {};
  const userData = await getDocs(collection(db, "users"));
  userData.forEach((doc) => {
    data[doc.id] = doc.data();
  });
  var state = false;
  const addresses = Object.keys(data);
  addresses.map((address) => {
    if (address === user) state = true;
  });
  return state;
};

//creates a new User
const createUser = async (address) => {
  const user = {
    username: "user",
    about: "",
    profilePic: "",
    followers: [],
    videos: [],
    requests: [],
    lives: [],
    address: address,
    transactions: [],
  };
  var data = {};
  const userData = await getDocs(collection(db, "users"));
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data();
  });
  if (data[address]) {
    console.log("User already registered");
  } else {
    await setDoc(doc(db, "users", address), user);
  }
};

//updates a users data
const updateUserProfile = async (username, about, profilePic, address) => {
  var data = {};
  const userData = await getDocs(collection(db, "users"));
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data();
  });
  var temp = data[address];
  temp.about = about;
  temp.username = username;
  temp.profilePic = profilePic;
  await setDoc(doc(db, "users", address), temp);
};

//gets a users data
const getUserDetails = async (address) => {
  var data = {};
  const userData = await getDocs(collection(db, "users"));
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data();
  });
  const details = data[address];
  const balances = await getTokenBalance(address);
  details.balance = balances.ethBalanceEther;
  details.tokenBalance = balances.tokenBalanceEther;
  return details;
};

const getAllVideos = async () => {
  var data = {};
  const videoData = await getDocs(collection(db, "content"));
  videoData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data().data;
  });
  const details = data["videos"];
  return details;
};

const getAllRequests = async () => {
  var data = {};
  const requestData = await getDocs(collection(db, "content"));
  requestData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data().data;
  });
  const details = data["requests"];
  return details;
};

/**
 * MAIN FUNCTIONS
 */
const getUserData = async (address) => {
  var data;
  const condition = await checkIfUserExists(address);
  if (!condition) await createUser(address);

  data = await getUserDetails(address);
  const videos = await getAllVideos();
  const requests = await getAllRequests();

  if (!condition) {
    return {
      data,
      new: true,
      videos,
      requests,
    };
  } else {
    return {
      data,
      new: false,
      videos,
      requests,
    };
  }
};

const uploadNewVideo = async (
  id,
  title,
  description,
  url,
  thumbnail,
  author,
  author_dp,
  address,
  tags,
  duration,
  cost
) => {
  var data1 = {};
  var data2 = {};
  const videoData = await getDocs(collection(db, "content"));
  const userData = await getDocs(collection(db, "users"));

  videoData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data1[doc.id] = doc.data().data;
  });

  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data2[doc.id] = doc.data();
  });

  const videoDetails = {
    id,
    title,
    description,
    url,
    thumbnail: thumbnail
      ? thumbnail
      : "https://bafybeif6xfbv6wlrcw25cd76n3tjwzeznv4yegru5z7hmka5akksdkjnri.ipfs.dweb.link/beuty.png",
    author,
    author_dp,
    tags,
    duration,
    payementAddress: address,
    cost,
  };

  data1["videos"].push(videoDetails);
  data2[address].videos.push(videoDetails);

  await setDoc(doc(db, "content", "videos"), { data: data1["videos"] });
  await setDoc(doc(db, "users", address), data2[address]);
};

const createRequest = async (requestDetails, address) => {
  var data1 = {};
  var data2 = {};
  const requestData = await getDocs(collection(db, "content"));
  const userData = await getDocs(collection(db, "users"));

  requestData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data1[doc.id] = doc.data().data;
  });

  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data2[doc.id] = doc.data();
  });

  data1["requests"].push(requestDetails);
  data2[address].requests.push(requestDetails);

  await setDoc(doc(db, "content", "requests"), { data: data1["requests"] });
  await setDoc(doc(db, "users", address), data2[address]);
};

const recordTransaction = async (address, details) => {
  var data = {};
  const userData = await getDocs(collection(db, "users"));
  userData.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data[doc.id] = doc.data();
  });
  const user = data[address];
  user.transactions.unshift(details);
  await setDoc(doc(db, "users", address), user);
};

export {
  getUserData,
  updateUserProfile,
  uploadNewVideo,
  getUserDetails,
  db,
  recordTransaction,
  getAllVideos,
  getAllRequests,
  createRequest,
};

const tempVideos = [
  {
    id: 1,
    title: "The jazz hop cafe stream",
    thumbnail:
      "https://bafybeif6xfbv6wlrcw25cd76n3tjwzeznv4yegru5z7hmka5akksdkjnri.ipfs.dweb.link/beuty.png",
    link: "https://kdzxfxxxva6r3w5ts3uwnrrmqvq2un73dzrpp6dzjxiiy4ai7a2q.arweave.net/UPNy3veoPR3bs5bpZsYshWGqN_seYvf4eU3QjHAI-DU/",
    details: "sckasjchlasn asjlhfsk asljhjksaj aslhksaf",
    author: "Seun",
    author_id: "1",
    author_dp:
      "https://bafybeignovnejiid7cw44lse7764gphel4uln63ng2g42dqzqvtfbxqfyi.ipfs.dweb.link/profile.svg",
  },
  {
    id: 1,
    title: "The jazz hop cafe stream",
    thumbnail:
      "https://bafybeif6xfbv6wlrcw25cd76n3tjwzeznv4yegru5z7hmka5akksdkjnri.ipfs.dweb.link/beuty.png",
    link: "https://kdzxfxxxva6r3w5ts3uwnrrmqvq2un73dzrpp6dzjxiiy4ai7a2q.arweave.net/UPNy3veoPR3bs5bpZsYshWGqN_seYvf4eU3QjHAI-DU/",
    details: "sckasjchlasn asjlhfsk asljhjksaj aslhksaf",
    author: "Seun",
    author_id: "1",
    author_dp:
      "https://bafybeignovnejiid7cw44lse7764gphel4uln63ng2g42dqzqvtfbxqfyi.ipfs.dweb.link/profile.svg",
  },
  {
    id: 2,
    title: "The jazz hop cafe stream",
    thumbnail:
      "https://bafybeif6xfbv6wlrcw25cd76n3tjwzeznv4yegru5z7hmka5akksdkjnri.ipfs.dweb.link/beuty.png",
    link: "https://kdzxfxxxva6r3w5ts3uwnrrmqvq2un73dzrpp6dzjxiiy4ai7a2q.arweave.net/UPNy3veoPR3bs5bpZsYshWGqN_seYvf4eU3QjHAI-DU/",
    details: "sckasjchlasn asjlhfsk asljhjksaj aslhksaf",
    author: "Seun",
    author_id: "1",
    author_dp:
      "https://bafybeignovnejiid7cw44lse7764gphel4uln63ng2g42dqzqvtfbxqfyi.ipfs.dweb.link/profile.svg",
  },
  {
    id: 1,
    title: "The jazz hop cafe stream",
    thumbnail:
      "https://bafybeif6xfbv6wlrcw25cd76n3tjwzeznv4yegru5z7hmka5akksdkjnri.ipfs.dweb.link/beuty.png",
    link: "https://kdzxfxxxva6r3w5ts3uwnrrmqvq2un73dzrpp6dzjxiiy4ai7a2q.arweave.net/UPNy3veoPR3bs5bpZsYshWGqN_seYvf4eU3QjHAI-DU/",
    details: "sckasjchlasn asjlhfsk asljhjksaj aslhksaf",
    author: "Seun",
    author_id: "1",
    author_dp:
      "https://bafybeignovnejiid7cw44lse7764gphel4uln63ng2g42dqzqvtfbxqfyi.ipfs.dweb.link/profile.svg",
  },
  {
    id: 4,
    title: "The jazz hop cafe stream",
    thumbnail:
      "https://bafybeif6xfbv6wlrcw25cd76n3tjwzeznv4yegru5z7hmka5akksdkjnri.ipfs.dweb.link/beuty.png",
    link: "https://kdzxfxxxva6r3w5ts3uwnrrmqvq2un73dzrpp6dzjxiiy4ai7a2q.arweave.net/UPNy3veoPR3bs5bpZsYshWGqN_seYvf4eU3QjHAI-DU/",
    details: "sckasjchlasn asjlhfsk asljhjksaj aslhksaf",
    author: "Seun",
    author_id: "1",
    author_dp:
      "https://bafybeignovnejiid7cw44lse7764gphel4uln63ng2g42dqzqvtfbxqfyi.ipfs.dweb.link/profile.svg",
  },
  {
    id: 1,
    title: "The jazz hop cafe stream",
    thumbnail:
      "https://bafybeif6xfbv6wlrcw25cd76n3tjwzeznv4yegru5z7hmka5akksdkjnri.ipfs.dweb.link/beuty.png",
    link: "https://kdzxfxxxva6r3w5ts3uwnrrmqvq2un73dzrpp6dzjxiiy4ai7a2q.arweave.net/UPNy3veoPR3bs5bpZsYshWGqN_seYvf4eU3QjHAI-DU/",
    details: "sckasjchlasn asjlhfsk asljhjksaj aslhksaf",
    author: "Seun",
    author_id: "1",
    author_dp:
      "https://bafybeignovnejiid7cw44lse7764gphel4uln63ng2g42dqzqvtfbxqfyi.ipfs.dweb.link/profile.svg",
  },
  {
    id: 1,
    title: "The jazz hop cafe stream",
    thumbnail:
      "https://bafybeif6xfbv6wlrcw25cd76n3tjwzeznv4yegru5z7hmka5akksdkjnri.ipfs.dweb.link/beuty.png",
    link: "https://kdzxfxxxva6r3w5ts3uwnrrmqvq2un73dzrpp6dzjxiiy4ai7a2q.arweave.net/UPNy3veoPR3bs5bpZsYshWGqN_seYvf4eU3QjHAI-DU/",
    details: "sckasjchlasn asjlhfsk asljhjksaj aslhksaf",
    author: "Seun",
    author_id: "1",
    author_dp:
      "https://bafybeignovnejiid7cw44lse7764gphel4uln63ng2g42dqzqvtfbxqfyi.ipfs.dweb.link/profile.svg",
  },
  {
    id: 1,
    title: "The jazz hop cafe stream",
    thumbnail:
      "https://bafybeif6xfbv6wlrcw25cd76n3tjwzeznv4yegru5z7hmka5akksdkjnri.ipfs.dweb.link/beuty.png",
    link: "https://kdzxfxxxva6r3w5ts3uwnrrmqvq2un73dzrpp6dzjxiiy4ai7a2q.arweave.net/UPNy3veoPR3bs5bpZsYshWGqN_seYvf4eU3QjHAI-DU/",
    details: "sckasjchlasn asjlhfsk asljhjksaj aslhksaf",
    author: "Seun",
    author_id: "1",
    author_dp:
      "https://bafybeignovnejiid7cw44lse7764gphel4uln63ng2g42dqzqvtfbxqfyi.ipfs.dweb.link/profile.svg",
  },
  {
    id: 1,
    title: "The jazz hop cafe stream",
    thumbnail:
      "https://bafybeif6xfbv6wlrcw25cd76n3tjwzeznv4yegru5z7hmka5akksdkjnri.ipfs.dweb.link/beuty.png",
    link: "https://kdzxfxxxva6r3w5ts3uwnrrmqvq2un73dzrpp6dzjxiiy4ai7a2q.arweave.net/UPNy3veoPR3bs5bpZsYshWGqN_seYvf4eU3QjHAI-DU/",
    details: "sckasjchlasn asjlhfsk asljhjksaj aslhksaf",
    author: "Seun",
    author_id: "1",
    author_dp:
      "https://bafybeignovnejiid7cw44lse7764gphel4uln63ng2g42dqzqvtfbxqfyi.ipfs.dweb.link/profile.svg",
  },
  {
    id: 1,
    title: "The jazz hop cafe stream",
    thumbnail:
      "https://bafybeif6xfbv6wlrcw25cd76n3tjwzeznv4yegru5z7hmka5akksdkjnri.ipfs.dweb.link/beuty.png",
    link: "https://kdzxfxxxva6r3w5ts3uwnrrmqvq2un73dzrpp6dzjxiiy4ai7a2q.arweave.net/UPNy3veoPR3bs5bpZsYshWGqN_seYvf4eU3QjHAI-DU/",
    details: "sckasjchlasn asjlhfsk asljhjksaj aslhksaf",
    author: "Seun",
    author_id: "1",
    author_dp:
      "https://bafybeignovnejiid7cw44lse7764gphel4uln63ng2g42dqzqvtfbxqfyi.ipfs.dweb.link/profile.svg",
  },
  {
    id: 1,
    title: "The jazz hop cafe stream",
    thumbnail:
      "https://bafybeif6xfbv6wlrcw25cd76n3tjwzeznv4yegru5z7hmka5akksdkjnri.ipfs.dweb.link/beuty.png",
    link: "https://kdzxfxxxva6r3w5ts3uwnrrmqvq2un73dzrpp6dzjxiiy4ai7a2q.arweave.net/UPNy3veoPR3bs5bpZsYshWGqN_seYvf4eU3QjHAI-DU/",
    details: "sckasjchlasn asjlhfsk asljhjksaj aslhksaf",
    author: "Seun",
    author_id: "1",
    author_dp:
      "https://bafybeignovnejiid7cw44lse7764gphel4uln63ng2g42dqzqvtfbxqfyi.ipfs.dweb.link/profile.svg",
  },
  {
    id: 1,
    title: "The jazz hop cafe stream",
    thumbnail:
      "https://bafybeif6xfbv6wlrcw25cd76n3tjwzeznv4yegru5z7hmka5akksdkjnri.ipfs.dweb.link/beuty.png",
    link: "https://kdzxfxxxva6r3w5ts3uwnrrmqvq2un73dzrpp6dzjxiiy4ai7a2q.arweave.net/UPNy3veoPR3bs5bpZsYshWGqN_seYvf4eU3QjHAI-DU/",
    details: "sckasjchlasn asjlhfsk asljhjksaj aslhksaf",
    author: "Seun",
    author_id: "1",
    author_dp:
      "https://bafybeignovnejiid7cw44lse7764gphel4uln63ng2g42dqzqvtfbxqfyi.ipfs.dweb.link/profile.svg",
  },
  {
    id: 1,
    title: "The jazz hop cafe stream",
    thumbnail:
      "https://bafybeif6xfbv6wlrcw25cd76n3tjwzeznv4yegru5z7hmka5akksdkjnri.ipfs.dweb.link/beuty.png",
    link: "https://kdzxfxxxva6r3w5ts3uwnrrmqvq2un73dzrpp6dzjxiiy4ai7a2q.arweave.net/UPNy3veoPR3bs5bpZsYshWGqN_seYvf4eU3QjHAI-DU/",
    details: "sckasjchlasn asjlhfsk asljhjksaj aslhksaf",
    author: "Seun",
    author_id: "1",
    author_dp:
      "https://bafybeignovnejiid7cw44lse7764gphel4uln63ng2g42dqzqvtfbxqfyi.ipfs.dweb.link/profile.svg",
  },
];
