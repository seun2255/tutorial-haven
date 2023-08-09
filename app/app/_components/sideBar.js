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
  const [expanded, setExpanded] = useState(false);
  const [showText, setShowText] = useState(false);
  const [action, setAction] = useState("out");
  var pathname = usePathname();
  if (pathname === "/app") pathname = "/videos";

  /**
   * Event functions
   */

  const handleExpand = () => {
    if (action === "out") {
      setAction("over");
      setExpanded(true);
    } else {
      setAction("out");
      setShowText(false);
      setExpanded(false);
    }
  };

  /**
   * SReact pring Hooks
   */
  const sidebar = useSpring({
    width: expanded ? "190px" : "70px",
    config: { duration: 300 },
    onRest: () => {
      if (action === "over") setShowText(true);
    },
  });

  const icon = useSpring({});

  // const expandIcon = useSpring({
  //   transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
  //   config: { duration: 300 },
  // });

  const buttons = useSpring({
    config: { duration: 300 },
  });

  const animateText = useSpring({
    display: "inline-block",
  });

  const menuAnimation = useSpring({
    transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
  });

  /**
   * Static variables
   */
  const options = [
    { icon: icons.board, text: "Videos", link: "/app" },
    { icon: icons.addProject, text: "Create", link: "/app/create" },
    { icon: icons.list, text: "Recent sheet", link: "/app/recent" },
    { icon: icons.settings, text: "Settings", link: "/app/settings" },
  ];

  return (
    <animated.div className={styles.container} style={sidebar}>
      <div className={styles.logo__box}>
        <div className={styles.logo}>
          <Image alt="logo" src={icons.logo} layout="fill" />
        </div>
        {showText && (
          <animated.span className={styles.logo__name} style={animateText}>
            Tutorial Haven
          </animated.span>
        )}
      </div>
      <div className={styles.open__box} onClick={handleExpand}>
        <animated.div className={styles.open__icon} style={menuAnimation}>
          <Image alt="logo" src={icons.expand} layout="fill" />
        </animated.div>
      </div>
      <animated.div className={styles.nav__buttons} style={buttons}>
        {showText && <div className={styles.nav__title}>MENU</div>}
        {options.map((option, index) => {
          return (
            <Link href={option.link}>
              <div
                className={styles.nav__button__item}
                key={index}
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
                {showText && (
                  <animated.span
                    className={styles.nav__text}
                    style={animateText}
                  >
                    {option.text}
                  </animated.span>
                )}
              </div>
            </Link>
          );
        })}
      </animated.div>
    </animated.div>
  );
}
