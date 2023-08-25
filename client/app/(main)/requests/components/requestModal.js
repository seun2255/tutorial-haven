"use client";

import Image from "next/image";
import styles from "./requestModal.module.css";
import icons from "@/app/_assets/icons/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { sendXDC, sendHaven, makeRequest } from "@/app/api";
import { recordTransaction } from "@/app/database";
import SuccesModal from "@/app/_modals/succedModal";
import { ThreeDots } from "react-loader-spinner";
import { timeStamp } from "@/app/utils/dateFunctions";

export default function RequestModal(props) {
  const { setModal } = props;
  const { user } = useSelector((state) => state.user);
  const [tipAmount, setTipAmount] = useState(5);
  const [selectedCurrency, setSelectedCurrency] = useState(0);
  const [succes, setSucces] = useState(false);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const currency = ["xdc", "hvn"];

  const selectCurrecy = (id) => {
    setSelectedCurrency(id);
  };

  const handleSend = () => {
    setLoading(true);
    if (selectedCurrency === 0) {
      if (tipAmount <= user.balance) {
        makeRequest({
          request: title,
          description,
          coin: "xdc",
          reward: tipAmount,
        }).then(() => {
          recordTransaction(user.address, {
            type: "Request",
            date: timeStamp(),
            amount: tipAmount,
            coin: "xdc",
          }).then(() => {
            console.log("Got here");
            setSucces(true);
            setLoading(false);
            setTimeout(() => {
              setSucces(false);
              setModal(false);
            }, 4000);
          });
        });
      } else {
        alert("You dont have enough xdc");
      }
    } else {
      if (tipAmount <= user.tokenBalance) {
        makeRequest({
          request: title,
          description,
          coin: "hvn",
          reward: tipAmount,
        }).then(() => {
          recordTransaction(user.address, {
            type: "Request",
            date: timeStamp(),
            amount: tipAmount,
            coin: "hvn",
          }).then(() => {
            console.log("Got here");
            setSucces(true);
            setLoading(false);
            setTimeout(() => {
              setSucces(false);
              setModal(false);
            }, 4000);
          });
        });
      } else {
        alert("You dont have enough hvn");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.close} onClick={() => setModal(false)}>
          <Image src={icons.cancel} alt="cancel icon" fill />
        </div>
        <h3 className={styles.title}>Request for a Tutorial</h3>
        <p className={styles.extra}>
          Seems you culdn't find the tutorial you needed, no biggie, you can
          just request for a creator to make it. set a decent reward and you'll
          see creators willing to help.
        </p>

        <div className={styles.input__box}>
          <h3>Title</h3>
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="A descriptive title works best"
          />
        </div>
        <div className={styles.input__box}>
          <h3>Description</h3>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Whats your content about"
          />
        </div>

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

        <input
          type="number"
          className={styles.custom__input}
          value={tipAmount}
          onChange={(e) => setTipAmount(e.target.value)}
        />
        <p className={styles.tip__details}>
          include a decent enough reward to get attention
        </p>
        <button className={styles.send__button} onClick={handleSend}>
          {loading ? (
            <ThreeDots
              height="50%"
              width="100px"
              color="#ffffff"
              visible={true}
            />
          ) : (
            "create request"
          )}
        </button>
      </div>
      {succes && <SuccesModal text={"Request Created"} />}
    </div>
  );
}
