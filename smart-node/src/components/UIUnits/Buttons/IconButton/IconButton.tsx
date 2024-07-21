"use client";

import React from "react";
import styles from "./IconButton.module.scss";

type Props = {
  icon: JSX.Element;
  label?: string;
  onClick: () => void;
};

const IconButton: React.FC<Props> = ({ label, icon, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <span className={styles.icon}>{icon}</span>
      {label}
    </button>
  );
};

export default IconButton;
