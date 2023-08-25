"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import icons from "@/app/_assets/icons/icons";

export default function Requests() {
  const [selected, setSelected] = useState();
  const [request, setRequest] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.top}>
          <h3>Requests</h3>
          <button>
            <div className={styles.plus__icon}>
              <Image src={icons.plus} alt="plus icon" fill />
            </div>
            new
          </button>
        </div>
        <div className={StyleSheet.bottm}></div>
      </div>
    </div>
  );
}
