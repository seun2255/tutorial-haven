import { animated, useSpring } from "@react-spring/web";
import styles from "./connectWallet.module.css";
import { useDispatch } from "react-redux";
import { setWalletModal } from "@/app/redux/modals";
import { login, updateUser } from "@/app/redux/user";
import { updateVideos } from "@/app/redux/videos";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { connect } from "@/app/api";

export default function ConnectWallet() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleArConnect = async () => {
    const { user, videos } = await arconnect();
    dispatch(login(user));
    dispatch(updateVideos(videos));
    dispatch(setWalletModal(false));
  };

  const handleConnect = async () => {
    connect().then((data) => {
      dispatch(login(data.user));
      dispatch(updateVideos(data.videos));
      dispatch(setWalletModal(false));
      console.log(data.user);
    });
  };

  const popUpEffect = useSpring({
    from: { opacity: 0, top: "200px" },
    to: { opacity: 1, top: "0px" },
    config: { duration: 150 },
  });

  return (
    <div
      className={styles.outer}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setWalletModal(false));
      }}
    >
      <animated.div
        className={styles.container}
        style={popUpEffect}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setWalletModal(true));
        }}
      >
        {loading ? (
          <ThreeDots
            height="70%"
            width="100%"
            color="#597dffb7"
            visible={true}
          />
        ) : (
          <div className={styles.options}>
            <h2 className={styles.title}>Connect Wallet</h2>
            <p className={styles.details}>
              In order to view and create content you need to connect to your
              arweave wallet <br /> Tutorial haven supports two wallets,
              Arweave.app and ArConnect
            </p>
            <div className={styles.buttons}>
              <button className={styles.button} onClick={handleConnect}>
                Metamask
              </button>
              {/* <button className={styles.button} onClick={handleArConnect}>
                Arconnect
              </button> */}
            </div>
          </div>
        )}
      </animated.div>
    </div>
  );
}
