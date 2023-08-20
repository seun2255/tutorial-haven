"use client";

import Image from "next/image";
import SideBar from "../_components/sideBar";
import Navbar from "../_components/navbar";
import styles from "./layout.module.css";
import NewUser from "../_modals/newUser";
import icons from "../_assets/icons/icons";
import { useState } from "react";
import { Connect } from "../_components/connectButton";
import { useAccount } from "wagmi";
import { getUserData } from "../database";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/user";
import { updateVideos } from "../redux/videos";

export default function Wrapper({ children }) {
  const { connected } = useSelector((state) => state.user);
  const [newUserModal, setNewUserModal] = useState(false);
  const dispath = useDispatch();

  useAccount({
    onConnect({ address }) {
      getUserData(address).then((data) => {
        console.log("Logging in");
        dispath(login(data.data));
        dispath(updateVideos(data.videos));
        if (data.new) setNewUserModal(true);
      });
    },
  });

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
            <Connect />
          </div>
        )}
      </div>

      {newUserModal && <NewUser setModal={setNewUserModal} />}
    </div>
  );
}
