"use client";

import Head from "next/head";
import Image from "next/image";
import styles from "./page.module.css";
import icons from "@/app/_assets/icons/icons";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import SideBar from "./components/sidebar";
import "video-react/dist/video-react.css";
import { Player, ControlBar } from "video-react";
import SupportModal from "@/app/_modals/supportModal";
import { confirmAccess, payForAccess } from "@/app/api";
import Link from "next/link";
import SuccesModal from "@/app/_modals/succedModal";

export default function Video({ params }) {
  const { user } = useSelector((state) => state.user);
  const { videos } = useSelector((state) => state.videos);
  const [suppportModal, setSupportModal] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [display, setDisplay] = useState(false);
  const [succes, setSucces] = useState(false);
  const video = videos[params.id - 1];
  console.log(video);

  // const video = {
  //   id: 1,
  //   title: "The Jazz hop cafe stream",
  //   thumbnail:
  //     "https://bafybeif6xfbv6wlrcw25cd76n3tjwzeznv4yegru5z7hmka5akksdkjnri.ipfs.dweb.link/beuty.png",
  //   url: "https://kdzxfxxxva6r3w5ts3uwnrrmqvq2un73dzrpp6dzjxiiy4ai7a2q.arweave.net/UPNy3veoPR3bs5bpZsYshWGqN_seYvf4eU3QjHAI-DU/",
  //   details: "sckasjchlasn asjlhfsk asljhjksaj aslhksaf",
  //   author: "Seun",
  //   author_id: "1",
  //   author_dp:
  //     "https://bafybeignovnejiid7cw44lse7764gphel4uln63ng2g42dqzqvtfbxqfyi.ipfs.dweb.link/profile.svg",
  // };

  useEffect(() => {
    const checkAccess = async () => {
      const access = await confirmAccess(user.address, params.id);
      setDisplay(access);
      console.log(access);
    };
    checkAccess();
  }, []);

  const handlePay = () => {
    payForAccess(video.id, video.cost).then((result) => {
      if (result) {
        setSucces(true);
        setTimeout(() => {
          setSucces(false);
        }, 4000);
        setDisplay(true);
      }
    });
  };

  return (
    <section className={styles.container}>
      <Navbar setSidebar={setSidebar} sidebar={sidebar} />
      <div className={styles.content}>
        <div className={styles.left}>
          {display ? (
            <Player
              autoPlay
              poster={video.thumbnail}
              src={video.url}
              className={styles.player}
            >
              <ControlBar autoHide={false} className="my-class" />
            </Player>
          ) : (
            <div className={styles.no__access}>
              <h3>You don't have access to this 🥺</h3>
              <p>gain access by supporting the creator of this content</p>
              <button onClick={handlePay}>Pay {video.cost} HVN fee</button>
            </div>
          )}
          <div className={styles.video__info}>
            <div className={styles.details}>
              <h3 className={styles.video__title}>{video.title}</h3>
              <div className={styles.counts}>views</div>
            </div>
            <div className={styles.buttons}>
              <button
                className={styles.follow__button}
                onClick={() => setSupportModal(true)}
              >
                support
              </button>
              <button className={styles.follow__button}>follow</button>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <h3>Recommendations</h3>
          {videos.map((item, id) => {
            if (id !== video.id - 1) {
              return (
                <Link href={`/videos/${item.id}`}>
                  <div className={styles.video__item} key={id}>
                    <div className={styles.thumbnail}>
                      <img
                        alt="profile pic"
                        src={item.thumbnail}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "5px",
                        }}
                      />
                    </div>
                    <div className={styles.info}>
                      <p className={styles.title}>{item.title}</p>
                      <p className={styles.author}>{item.author}</p>
                    </div>
                  </div>
                </Link>
              );
            }
          })}
        </div>
        <SideBar expanded={sidebar} />
      </div>
      {suppportModal && (
        <SupportModal
          setModal={setSupportModal}
          payementAddress={video.payementAddress}
        />
      )}
      {succes && <SuccesModal text={"Payement Succesful"} />}
    </section>
  );
}
