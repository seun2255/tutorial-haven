"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useSelector } from "react-redux";
import VideoCard from "../_components/videoCard";
import { useRef } from "react";
import icons from "../_assets/icons/icons";
import SuccesModal from "../_modals/succedModal";

export default function Home() {
  //   const { videos } = useSelector((state) => state.videos);
  const scrollDiv = useRef(null);

  const scrollLeft = () => {
    if (scrollDiv.current) {
      scrollDiv.current.scrollLeft -= 100;
    }
  };

  const scrollRight = () => {
    if (scrollDiv.current) {
      scrollDiv.current.scrollLeft += 100;
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.head}>Categories</h3>
      <div className={styles.scroll__container}>
        <div className={styles.left} onClick={scrollLeft}>
          <Image src={icons.scrollArrow} fill alt="icon" />
        </div>
        <div className={styles.right} onClick={scrollRight}>
          <Image src={icons.scrollArrow} fill alt="icon" />
        </div>
        <div
          className={styles.categories}
          ref={scrollDiv}
          onWheel={(e) => {
            e.preventDefault();
          }}
        >
          {categories.map((category, id) => {
            return (
              <div className={styles.category} key={id}>
                {category}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.content}>
        {/* {videos.map((video) => {
          return <VideoCard video={video} />;
        })} */}
      </div>
    </div>
  );
}

const categories = [
  "tech",
  "school",
  "diy",
  "cooking",
  "guides",
  "sports",
  "music",
  "games",
  "dance",
  "education",
  "science",
  "art",
];
