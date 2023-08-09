"use client";

import "./globals.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";

export const metadata = {
  title: "Tutorial Haven",
  description: "Decentralized Video Streaming",
};

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </Provider>
  );
}
