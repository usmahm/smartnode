"use client";

import React from "react";
import clsx from "clsx";
import LogoIcon from "@/assets/icons/logo.svg";
import SearchIcon from "@/assets/icons/searchIcon.svg";
import HomeIcon from "@/assets/icons/homeIcon.svg";
import CreateIcon from "@/assets/icons/addIcon.svg";
import UserIcon from "@/assets/icons/userIcon.svg";
import styles from "./Header.module.scss";
import IconButton from "../Buttons/IconButton/IconButton";

export type HeaderTypes = "UNAUTH" | "AUTH";

type Props = {
  type: HeaderTypes;
};
type BtnId = "SEARCH" | "HOME" | "CREATE";

const Header: React.FC<Props> = ({ type }) => {
  const headerBtnClickHandler = (btnId: BtnId) => {};

  const renderHeader = () => {
    let headerEl = <></>;
    switch (type) {
      case "UNAUTH":
        headerEl = (
          <>
            <LogoIcon />
          </>
        );
        break;
      case "AUTH":
        headerEl = (
          <>
            <LogoIcon />
            <div className={styles.aside}>
              <IconButton
                icon={<SearchIcon />}
                onClick={() => headerBtnClickHandler("SEARCH")}
              />
              <IconButton
                icon={<HomeIcon />}
                onClick={() => headerBtnClickHandler("SEARCH")}
              />
              <IconButton
                icon={<CreateIcon />}
                onClick={() => headerBtnClickHandler("SEARCH")}
              />
              <button onClick={() => {}} className={styles.profileIcon}>
                <UserIcon />
              </button>
            </div>
          </>
        );
        break;

      default:
        break;
    }
    return headerEl;
  };

  return (
    <div
      className={clsx({
        [styles.header]: true,
        [styles.header__auth]: type === "UNAUTH",
      })}
    >
      <>{renderHeader()}</>
    </div>
  );
};

export default Header;
