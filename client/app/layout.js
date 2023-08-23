"use client";

import "./globals.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { xdcTestnet, localhost, hardhat } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

// const { chains, publicClient } = configureChains(
//   [xdcTestnet],
//   [
//     jsonRpcProvider({
//       rpc: (chain) => ({
//         http: `https://erpc.apothem.network`,
//       }),
//     }),
//     publicProvider(),
//   ]
// );

// const { connectors } = getDefaultWallets({
//   appName: "Tutorial Haven",
//   projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
//   chains,
// });

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient,
// });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
