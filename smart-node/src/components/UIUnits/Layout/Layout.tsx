import React from "react";
import styles from "./Layout.module.scss";
import Header, { HeaderTypes } from "../Header/Header";

type Props = {
  headerType: HeaderTypes;
  children: JSX.Element;
};

const Layout: React.FC<Props> = ({ headerType, children }) => {
  return (
    <main className={styles.main}>
      <Header type={headerType} />
      <div className={styles.headerBlock} />
      <div className={styles.content}>{children}</div>
    </main>
  );
};

export default Layout;
