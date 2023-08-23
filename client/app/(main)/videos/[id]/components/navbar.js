"use client";

import Image from "next/image";
import styles from "./navbar.module.css";
import icons from "@/app/_assets/icons/icons";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Connect } from "@/app/_components/connectButton";
import { useSpring, animated } from "@react-spring/web";

export default function Navbar(props) {
  const { setSidebar, sidebar } = props;
  const { connected, user } = useSelector((state) => state.user);

  const handleExpand = () => {
    setSidebar(!sidebar);
  };

  const menuAnimation = useSpring({
    transform: sidebar ? "rotate(0deg)" : "rotate(-90deg)",
  });

  return (
    <div className={styles.container}>
      <div className={styles.left__items}>
        <div className={styles.open__box} onClick={handleExpand}>
          <animated.div className={styles.open__icon} style={menuAnimation}>
            <Image alt="logo" src={icons.expand} fill />
          </animated.div>
        </div>
        <div className={styles.logo__box}>
          <div className={styles.logo}>
            <Image alt="logo" src={icons.logo} fill />
          </div>
          <span className={styles.logo__text}>
            <Image src={icons.logoText} alt="text" fill />
          </span>
        </div>
        <div className={styles.search__bar}>
          <input
            type="search"
            className={styles.search__input}
            placeholder="Search...."
          />
          <div className={styles.search__icon}>
            <Image alt="searh" fill src={icons.search} />
          </div>
        </div>
      </div>
      {connected ? (
        <div className={styles.name__card}>
          <div className={styles.profile__pic}>
            <Image
              alt="user"
              fill
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
