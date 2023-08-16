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

const db = getFirestore(app);

/**
 * User Functions
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
    address: address,
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

  if (!condition) {
    return {
      data,
      new: true,
    };
  } else {
    return {
      data,
      new: false,
    };
  }
};

export { getUserData, updateUserProfile };
