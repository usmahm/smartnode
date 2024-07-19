import React from "react";
import styles from "./SubHeader.module.scss";

type Props = {
  title: string;
  subTitle: string;
};

const SubHeader: React.FC<Props> = ({ title, subTitle }) => {
  return (
    <>
      <h1 className={styles.hTitle}>{title}</h1>
      <p className={styles.hSubTitle}>{subTitle}</p>
    </>
  );
};

export default SubHeader;
