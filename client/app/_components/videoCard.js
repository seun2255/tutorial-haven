"use client";

import styles from "./videocard.module.css";
import Link from "next/link";
import icons from "@/app/_assets/icons/icons";
import Image from "next/image";

export default function VideoCard(props) {
  const { video } = props;

  return (
    <Link href={`/videos/${video.id}`}>
      <div className={styles.main}>
        <div className={styles.thumbnail}>
          <Image src={video.thumbnail} fill alt="thumbnail" />
        </div>
        <div className={styles.details}>
          <div className={styles.dp}>
            <Image
              src={video.author_dp === "" ? icons.profile : video.author_dp}
              alt="profile__pic"
              fill
            />
          </div>
          <div className={styles.text__details}>
            <p className={styles.title}>{video.title}</p>
            <p className={styles.author}>{video.author}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
