"use client";

import Image from "next/image";
import styles from "./navbar.module.css";
import icons from "@/app/_assets/icons/icons";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Connect } from "./connectButton";
import { useAccount } from "wagmi";
import { getSigner } from "../api";

export default function Navbar() {
  const { connected, user } = useSelector((state) => state.user);
  const { isConnected, address } = useAccount();

  return (
    <div className={styles.container}>
      <div className={styles.search__bar}>
        <input
          type="search"
          className={styles.search__input}
          placeholder="Search...."
        />
        <div className={styles.search__icon}>
          <Image alt="searh" layout="fill" src={icons.search} />
        </div>
      </div>
      {connected ? (
        <div className={styles.name__card}>
          <div className={styles.profile__pic}>
            <Image
              alt="user"
              layout="fill"
              src={user.profilePic === "" ? icons.profile : user.profilePic}
            />
          </div>
          <span className={styles.username}>{user.username}</span>
        </div>
      ) : (
        <Connect />
      )}
    </div>
  );
}
