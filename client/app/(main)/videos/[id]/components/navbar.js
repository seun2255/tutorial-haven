"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";
import icons from "@/app/_assets/icons/icons";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Connect } from "@/app/_components/connectButton";
import { useSpring, animated } from "@react-spring/web";
import searchVideo from "@/app/utils/search";

export default function Navbar(props) {
  const { setSidebar, sidebar } = props;
  const { connected, user } = useSelector((state) => state.user);
  const { videos } = useSelector((state) => state.videos);
  const [results, setResults] = useState(videos);
  const [searchModal, setSearchModal] = useState(false);

  const handleExpand = () => {
    setSidebar(!sidebar);
  };

  const menuAnimation = useSpring({
    transform: sidebar ? "rotate(0deg)" : "rotate(-90deg)",
  });

  const handleSearch = (text) => {
    console.log(text);
    const searchResults = searchVideo(videos, text);
    setResults(searchResults);
    if (text !== "") {
      setSearchModal(true);
    } else {
      setSearchModal(false);
    }
  };

  return (
    <div
      className={styles.container}
      onMouseLeave={() => setSearchModal(false)}
    >
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
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className={styles.search__icon}>
            <Image alt="searh" fill src={icons.search} />
          </div>
          {searchModal && (
            <div className={styles.search__results}>
              {results.map((item) => {
                return (
                  <Link href={`/videos/${item.id}`}>
                    <div
                      className={styles.search__item}
                      onClick={() => setSearchModal(false)}
                    >
                      <h3>{item.title}</h3>
                      <span>{item.author}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
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
