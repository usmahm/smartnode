"use client";

import React from "react";
import styles from "./IconButton.module.scss";

type Props = {
  icon: JSX.Element;
  onClick: () => void;
};

const IconButton: React.FC<Props> = ({ icon, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {icon}
    </button>
  );
};

export default IconButton;
