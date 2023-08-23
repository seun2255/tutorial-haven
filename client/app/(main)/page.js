"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useSelector } from "react-redux";
import VideoCard from "../_components/videoCard";
import { useEffect, useRef } from "react";

export default function Home() {
  const { videos } = useSelector((state) => state.videos);

  return (
    <div className={styles.container}>
      <div className={styles.scroll__container}>
        <div className={styles.categories}>
          <div className="fading-mask"></div>
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
        {videos.map((video, id) => {
          return <VideoCard video={video} key={id} />;
        })}
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
