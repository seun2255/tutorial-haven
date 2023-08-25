"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import icons from "@/app/_assets/icons/icons";
import Table from "./components/table";
import { useSelector } from "react-redux";
import RequestModal from "./components/requestModal";

export default function Requests() {
  const { requests } = useSelector((state) => state.requests);
  const [selected, setSelected] = useState();
  const [request, setRequest] = useState(false);

  const handleSearch = (text) => {};

  return (
    <div className={styles.container}>
      <h3>Tutorial Requests</h3>
      <div className={styles.requests}>
        <div className={styles.top}>
          <input className={styles.input} placeholder="Search..." />
          <button
            className={styles.new__button}
            onClick={() => setRequest(true)}
          >
            <div className={styles.plus__icon}>
              <Image src={icons.plus} alt="plus icon" fill />
            </div>
            new
          </button>
        </div>
        <Table data={requests} />
      </div>
      {request && <RequestModal setModal={setRequest} />}
    </div>
  );
}
