import React from "react";
import styles from "./Button.module.scss";

type Props = {
  children: JSX.Element | string; // find a better way to do this
  onClick: () => void;
};

const Button: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
