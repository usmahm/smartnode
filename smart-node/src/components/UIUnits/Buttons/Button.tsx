import React from "react";
import styles from "./Button.module.scss";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

type Props = {
  children: JSX.Element | string; // find a better way to do this
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
};

const Button: React.FC<Props> = ({ children, onClick, disabled, loading }) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {!loading && children}
      {loading && <LoadingSpinner />}
    </button>
  );
};

export default Button;
