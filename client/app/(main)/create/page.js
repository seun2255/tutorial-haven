"use client";

import Image from "next/image";
import styles from "./page.module.css";
import icons from "@/app/_assets/icons/icons";
import Link from "next/link";

export default function Create() {
  return (
    <div className={styles.container}>
      <div className={styles.option}>
        <h2 className={styles.header}>Upload Tutorial</h2>
        <Link href={"/create/upload-video"}>
          <div className={styles.box}>
            <div className={styles.icon__container}>
              <div className={styles.icon}>
                <Image src={icons.upload} fill alt="icon" />
              </div>
            </div>
            <div className={styles.details}>
              <p className={styles.upper__text}>create a new video tutorial</p>
              <p className={styles.lower__text}>
                upload quality educational content.
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className={styles.option}>
        <h2 className={styles.header}>Schedule Class</h2>
        <div className={styles.box}>
          <div className={styles.icon__container}>
            <div className={styles.icon}>
              <Image src={icons.schedule} fill alt="icon" />
            </div>
          </div>
          <div className={styles.details}>
            <p className={styles.upper__text}>Schedule a new class</p>
            <p className={styles.lower__text}>
              set up a class on a topic of your choice
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
