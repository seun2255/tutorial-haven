"use client";

import Image from "next/image";
import SideBar from "./_components/sideBar";
import Navbar from "./_components/navbar";
import styles from "./layout.module.css";
import NewUser from "./_modals/newUser";
import icons from "./_assets/icons/icons";
import { useState } from "react";
import { Connect } from "./_components/connectButton";
import { useAccount } from "wagmi";

export default function Wrapper({ children }) {
  const { isConnected } = useAccount();
  const [newUserModal, setNewUserModal] = useState(false);

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.content}>
        <Navbar />
        {isConnected ? (
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

      {newUserModal && <NewUser />}
    </div>
  );
}
