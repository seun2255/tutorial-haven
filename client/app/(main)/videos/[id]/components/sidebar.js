"use client";

import Image from "next/image";
import styles from "./sidebar.module.css";
import icons from "@/app/_assets/icons/icons";
import { useSpring, animated } from "@react-spring/web";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import getPath from "@/app/utils/getPath";

export default function SideBar(props) {
  const { expanded } = props;
  var pathname = usePathname();
  if (pathname === "/app") pathname = "/videos";

  /**
   * React spring Hooks
   */

  const outer = useSpring({
    from: { opacity: 0 },
    to: { opacity: 0.6 },
    config: { duration: 300 },
  });

  const sidebar = useSpring({
    left: expanded ? "0px" : "-190px",
    config: { duration: 300 },
  });

  /**
   * Static variables
   */
  const options = [
    { icon: icons.settings, text: "Videos", link: "/" },
    { icon: icons.settings, text: "Create", link: "/create" },
    { icon: icons.settings, text: "Recent sheet", link: "/recent" },
    { icon: icons.settings, text: "Settings", link: "/settings" },
  ];

  return (
    expanded && (
      <animated.div className={styles.outer}>
        <animated.div className={styles.container} style={sidebar}>
          <div className={styles.nav__buttons}>
            {options.map((option, index) => {
              return (
                <Link href={option.link} key={index}>
                  <div
                    className={styles.nav__button__item}
                    style={{
                      backgroundColor:
                        getPath(pathname) === option.text.toLowerCase()
                          ? "#9ECCA4"
                          : "transparent",
                      borderLeft:
                        getPath(pathname) === option.text.toLowerCase()
                          ? "3px solid #014430"
                          : "none",
                    }}
                  >
                    <div className={styles.icon__box}>
                      <Image alt="icon" layout="fill" src={option.icon} />
                    </div>
                    <span className={styles.nav__text}>{option.text}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </animated.div>
      </animated.div>
    )
  );
}
