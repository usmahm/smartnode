import React from "react";
import styles from "./ContentWrapper.module.scss";

type Props = {
  children: React.ReactElement; // find a better way to do this
};

const ContentWrapper: React.FC<Props> = ({ children }) => {
  // add support for multiple types
  return <div className={styles.wrapper}>{children}</div>;
};

export default ContentWrapper;
