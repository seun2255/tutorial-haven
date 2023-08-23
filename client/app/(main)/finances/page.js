"use client";

import Head from "next/head";
import Image from "next/image";
import styles from "./page.module.css";
import icons from "@/app/_assets/icons/icons";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import Table from "./table";
import { useBalance } from "wagmi";
import { formatToTwoDecimalPlaces } from "@/app/utils/formatBalance";
import { buyTokens, sellTokens } from "@/app/api";

export default function Finance() {
  const { user } = useSelector((state) => state.user);
  const [coin, setCoin] = useState("xdc");
  const [swapAmount, setSwapAmount] = useState(0);

  const balance = useBalance({
    address: user.address,
    watch: true,
    formatUnits: "ether",
  });

  const handleSwitch = () => {
    if (coin === "xdc") {
      setCoin("hvn");
    } else {
      setCoin("xdc");
    }
  };

  const handleSwap = () => {
    if (swapAmount > 0) {
      if (coin === "xdc") {
        const amount = swapAmount.toString();
        buyTokens(amount).then(() => {
          console.log("Tokens bought");
        });
      } else {
        sellTokens(amount).then(() => {
          console.log("Tokens sold");
        });
      }
    } else {
      alert("Enter an amount");
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.top__section}>
        <div className={styles.left}>
          <div className={styles.left__top}>
            <h3>My Balance</h3>
            <div className={styles.balances__container}>
              <div className={styles.balance__item}>
                <div className={styles.token__icon__container}>
                  <div className={styles.token__icon}>
                    <Image src={icons.xdcLogo} alt="icon" fill />
                  </div>
                </div>
                <div className={styles.token__details}>
                  <p className={styles}>xdc balance</p>
                  <h3>
                    {formatToTwoDecimalPlaces(balance.data.formatted)} xdc
                  </h3>
                </div>
              </div>
              <div
                className={styles.balance__item}
                style={{ backgroundColor: "#ecf5ed" }}
              >
                <div
                  className={styles.token__icon}
                  style={{ width: "25px", height: "25px" }}
                >
                  <Image src={icons.logo} alt="icon" fill />
                </div>
                <div className={styles.token__details}>
                  <p className={styles}>Haven balance</p>
                  <h3>{user.tokenBalance} Haven</h3>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.left__bottom}>
            <span>Last 30 Days</span>
            <div className={styles.history}>
              <div className={styles.history__details}>
                <h4>Transactions</h4>
                <h2>38</h2>
              </div>
              <div className={styles.dividing__line}></div>
              <div className={styles.history__details}>
                <h4>Spending</h4>
                <h2>10hvn</h2>
              </div>
              <div className={styles.dividing__line}></div>
              <div className={styles.history__details}>
                <h4>Earnings</h4>
                <h2>30 hvn</h2>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <h3>Swap Tokens</h3>
          <div
            className={styles.switch__icon__container}
            onClick={handleSwitch}
          >
            <div className={styles.switch__icon}>
              <Image src={icons.change} alt="icon" fill />
            </div>
          </div>
          <div className={styles.swap__inputs}>
            {coin === "xdc" ? (
              <div className={styles.input__box}>
                <input
                  type="number"
                  onChange={(e) => setSwapAmount(e.target.value)}
                />
                <div className={styles.token__symbol}>xdc</div>
              </div>
            ) : (
              <div className={styles.input__box}>
                <input
                  type="number"
                  onChange={(e) => setSwapAmount(e.target.value)}
                />
                <div className={styles.token__symbol}>hvn</div>
              </div>
            )}
            <div className={styles.arrow}>
              <Image src={icons.arrowDown} alt="icon" fill />
            </div>
            {coin === "xdc" ? (
              <div className={styles.input__box}>
                <input
                  type="number"
                  value={swapAmount * 1000}
                  readOnly={true}
                />
                <div className={styles.token__symbol}>hvn</div>
              </div>
            ) : (
              <div className={styles.input__box}>
                <input
                  type="number"
                  value={swapAmount / 1000}
                  readOnly={true}
                />
                <div className={styles.token__symbol}>xdc</div>
              </div>
            )}
          </div>
          <button className={styles.swap__button} onClick={handleSwap}>
            Swap Tokens
          </button>
          <p>Swap your tokens at any time free of charge</p>
        </div>
      </div>
      <div className={styles.bottom__section}>
        <h2>Transactions</h2>
        <Table data={data} />
      </div>
    </section>
  );
}

const data = [
  { type: "support", date: "octorber 1st", amount: "50 hvn" },
  { type: "support", date: "octorber 1st", amount: "50 hvn" },
  { type: "support", date: "octorber 1st", amount: "50 hvn" },
  { type: "support", date: "octorber 1st", amount: "50 hvn" },
  { type: "support", date: "octorber 1st", amount: "50 hvn" },
  { type: "support", date: "octorber 1st", amount: "50 hvn" },
  { type: "support", date: "octorber 1st", amount: "50 hvn" },
  { type: "support", date: "octorber 1st", amount: "50 hvn" },
  { type: "support", date: "octorber 1st", amount: "50 hvn" },
];
