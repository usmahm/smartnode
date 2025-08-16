"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import LogoIcon from "@/assets/icons/logo.svg";
import SearchIcon from "@/assets/icons/searchIcon.svg";
// import HomeIcon from "@/assets/icons/homeIcon.svg";
import CreateIcon from "@/assets/icons/addIcon.svg";
import UserIcon from "@/assets/icons/userIcon.svg";
import styles from "./Header.module.scss";
import IconButton from "../Buttons/IconButton/IconButton";
import Link from "next/link";
import { useUserContext } from "@/contexts/UserContext";

export type HeaderTypes = "UNAUTH" | "AUTH";

type Props = {
  type: HeaderTypes;
};
type BtnId = "SEARCH" | "HOME" | "CREATE";

const Header: React.FC<Props> = ({ type }) => {
  const [openOptions, setOpenOptions] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { logoutHandler } = useUserContext();
  // const headerBtnClickHandler = (btnId: BtnId) => {};

  const logout = () => {
    logoutHandler();
    setOpenOptions(false);
  };

  // useEffect(() => {
  //   // console.log("HEYYY 333", openOptions);
  // }, [openOptions]);

  const renderHeader = () => {
    let headerEl = <></>;
    switch (type) {
      case "UNAUTH":
        headerEl = (
          <Link href="/dashboard" className={styles.unauth}>
            <LogoIcon height={44} />
          </Link>
        );
        break;
      case "AUTH":
        headerEl = (
          <>
            <Link href="/dashboard">
              <LogoIcon height={44} />
            </Link>
            <div className={styles.aside}>
              {/* <IconButton
                icon={<SearchIcon height={24} />}
                onClick={() => headerBtnClickHandler("SEARCH")}
              /> */}
              {/* <IconButton
                icon={<HomeIcon height={24} />}
                onClick={() => headerBtnClickHandler("SEARCH")}
              /> */}
              {pathname !== "/node/activate" && (
                <IconButton
                  icon={<CreateIcon height={24} />}
                  onClick={() => router.push(`/node/activate`)}
                  label="Add Node"
                />
              )}
              {pathname === "/admin" && (
                <IconButton
                  icon={<CreateIcon height={24} />}
                  onClick={() => router.push(`/admin/create-node`)}
                  label="Create Node"
                />
              )}
              <div className={styles.profileIconWrapper}>
                <button
                  onClick={() => setOpenOptions((prev) => !prev)}
                  className={styles.profileIcon}
                >
                  <UserIcon height={40} />
                </button>
                {openOptions && (
                  <div className={styles.options}>
                    <button onClick={() => logout()}>Logout</button>
                  </div>
                )}
              </div>
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
