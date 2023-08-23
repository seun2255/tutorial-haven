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
import { login } from "../redux/user";
import { updateVideos } from "../redux/videos";
import { setWalletModal } from "../redux/modals";
import { useRouter } from "next/navigation";
import ConnectWallet from "../_modals/connectWallet";

export default function Wrapper({ children }) {
  const { connected } = useSelector((state) => state.user);
  const [newUserModal, setNewUserModal] = useState(false);
  const { walletModal } = useSelector((state) => state.modals);

  const dispatch = useDispatch();

  const router = useRouter();

  // useAccount({
  //   onConnect({ address }) {
  //     getUserData(address).then((data) => {
  //       console.log("Logging in");
  //       dispath(login(data.data));
  //       dispath(updateVideos(data.videos));
  //       if (data.new) setNewUserModal(true);
  //     });
  //   },
  // });

  // useEffect(() => {
  //   if (address) {
  //     console.log(address);
  //     getUserData(address).then((data) => {
  //       dispath(login(data.data));
  //       dispath(updateVideos(data.videos));
  //     });
  //   } else {
  //     router.push("/");
  //   }
  // }, []);

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

      {newUserModal && <NewUser setModal={setNewUserModal} />}
      {walletModal && <ConnectWallet />}
    </div>
  );
}
