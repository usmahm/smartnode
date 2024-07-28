import React from "react";
import styles from "./SubHeader.module.scss";

type Props = {
  title: string;
  subTitle: string;
  rightComponent?: JSX.Element;
};

const SubHeader: React.FC<Props> = ({ title, subTitle, rightComponent }) => {
  return (
    <div className={styles.subHeader}>
      <div>
        <h1 className={styles.hTitle}>{title}</h1>
        <p className={styles.hSubTitle}>{subTitle}</p>
      </div>
      {rightComponent && (
        <div className={styles.rightComp}>{rightComponent}</div>
      )}
    </div>
  );
};

export default SubHeader;
