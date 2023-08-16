"use client";

import Image from "next/image";
import styles from "./navbar.module.css";
import icons from "@/app/_assets/icons/icons";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Connect } from "./connectButton";
import { useAccount } from "wagmi";

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
        <button className={styles.name}>{user.username}</button>
      ) : (
        <Connect />
      )}
    </div>
  );
}
