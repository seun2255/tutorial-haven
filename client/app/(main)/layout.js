"use client";

import Image from "next/image";
import SideBar from "../_components/sideBar";
import Navbar from "../_components/navbar";
import styles from "./layout.module.css";
import NewUser from "../_modals/newUser";
import icons from "../_assets/icons/icons";
import { useEffect, useState } from "react";
import { getUserData } from "../database";
import { useDispatch, useSelector } from "react-redux";
import { setWalletModal } from "../redux/modals";
import ConnectWallet from "../_modals/connectWallet";
import { timeValid } from "../utils/dateFunctions";
import { connect } from "@/app/api";
import { doc, onSnapshot } from "firebase/firestore";
import { db, getAllVideos } from "../database";
import { getUserDetails } from "../database";
import { login, updateUser } from "@/app/redux/user";
import { updateVideos } from "@/app/redux/videos";

export default function Wrapper({ children }) {
  const { connected } = useSelector((state) => state.user);
  const { walletModal, newUserModal } = useSelector((state) => state.modals);

  const dispatch = useDispatch();

  useEffect(() => {
    const valid = localStorage.getItem("expiry");
    if (valid) {
      if (timeValid(valid)) {
        connect().then((data) => {
          dispatch(login(data.data));
          dispatch(updateVideos(data.videos));
          const unsubUser = onSnapshot(
            doc(db, "users", data.data.address),
            (doc) => {
              getUserDetails(data.data.address).then((data) => {
                dispatch(updateUser(data));
              });
            }
          );
          const unsubSchools = onSnapshot(
            doc(db, "content", "videos"),
            (doc) => {
              getAllVideos().then((videos) => {
                dispatch(updateVideos(videos));
              });
            }
          );
        });
        localStorage.removeItem("expiry");
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.content}>
        <Navbar />
        {connected ? (
          children
        ) : (
          <div className={styles.not__connected}>
            <div className={styles.lock__icon}>
              <Image src={icons.lock} alt="lock icon" fill />
            </div>
            <button
              className={styles.connect__button}
              onClick={() => dispatch(setWalletModal(true))}
            >
              Connect
            </button>
          </div>
        )}
      </div>

      {newUserModal && <NewUser />}
      {walletModal && <ConnectWallet />}
    </div>
  );
}
