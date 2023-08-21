"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./supportModal.module.css";
import icons from "@/app/_assets/icons/icons";
import { useState } from "react";

export default function SupportModal(props) {
  const { setModal } = props;
  const [custom, setCustom] = useState(true);
  const [tipAmount, setTipAmount] = useState(25);
  const [selectedAmount, setSelectedAmount] = useState(5);
  const [selectedCurrency, setSelectedCurrency] = useState(1);

  const selectPrice = (price, id) => {
    setTipAmount(price);
    setCustom(false);
    setSelectedAmount(id);
  };

  const selectCurrecy = (id) => {
    setSelectedCurrency(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.close} onClick={() => setModal(false)}>
          <Image src={icons.cancel} alt="cancel icon" fill />
        </div>
        <h3 className={styles.title}>Your support can make a difference</h3>
        <div className={styles.token__choice}>
          {currency.map((item, id) => {
            return (
              <button
                key={id}
                style={{
                  borderRadius: id === 0 ? "7px 0 0 7px" : "0 7px 7px 0",
                  backgroundColor:
                    selectedCurrency === id ? "rgb(4, 122, 219)" : null,
                }}
                onClick={() => selectCurrecy(id)}
              >
                {item}
              </button>
            );
          })}
        </div>
        <p className={styles.extra}>
          Show this creator your appreciation by sending a donation.
        </p>

        <div className={styles.amount__choice}>
          {amount.map((amount, id) => {
            return (
              <button
                key={id}
                style={{
                  borderRadius: amount === 1 ? "7px 0 0 7px" : 0,
                  backgroundColor:
                    selectedAmount === id ? "rgb(4, 122, 219)" : null,
                }}
                onClick={() => selectPrice(amount, id)}
              >
                {amount}
              </button>
            );
          })}
          <button
            style={{
              borderRadius: "0 7px 7px 0",
              backgroundColor: selectedAmount === 5 ? "rgb(4, 122, 219)" : null,
            }}
            onClick={() => {
              setCustom(true);
              setSelectedAmount(5);
            }}
          >
            custom
          </button>
        </div>

        {custom && (
          <input
            type="number"
            className={styles.custom__input}
            value={tipAmount}
            onChange={(e) => setTipAmount(e.target.value)}
          />
        )}
        <p className={styles.tip__details}>
          Send a tip directly from your attached card.
        </p>
        <button
          className={styles.send__button}
        >{`Send a ${tipAmount} Tip`}</button>
      </div>
    </div>
  );
}

const amount = [1, 5, 10, 25, 100];
const currency = ["xdc", "haven"];
