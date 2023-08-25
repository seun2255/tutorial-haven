"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useSelector } from "react-redux";
import VideoCard from "../_components/videoCard";
import { useEffect, useRef, useState } from "react";
import filterbyTag from "../utils/filter";

export default function Home() {
  const { videos } = useSelector((state) => state.videos);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [displayedVideos, setDisplayedVideos] = useState(videos);

  const handleSelect = (selected) => {
    if (selected === selectedCategory) {
      setSelectedCategory("");
      setDisplayedVideos(videos);
    } else {
      setSelectedCategory(selected);
      const query = filterbyTag(videos, selected);
      setDisplayedVideos(query);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.scroll__container}>
        <div className={styles.categories}>
          <div className="fading-mask"></div>
          {categories.map((category, id) => {
            return (
              <div
                className={styles.category}
                key={id}
                onClick={() => handleSelect(category)}
                style={{
                  backgroundColor:
                    category === selectedCategory ? "green" : null,
                  color: category === selectedCategory ? "white" : null,
                }}
              >
                {category}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.content}>
        {displayedVideos.map((video, id) => {
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
