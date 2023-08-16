"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./layout.module.css";
import icons from "../_assets/icons/icons";

export default function Wrapper({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <Link href={"/app"}>
          <div className={styles.back__button}>
            <div className={styles.back__icon}>
              <Image src={icons.back} alt="back icon" fill />
            </div>
            Back to Dashboard
          </div>
        </Link>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
