import React from "react";
import styles from "./Button.module.scss";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import clsx from "clsx";

type Props = {
  children: JSX.Element | string; // find a better way to do this
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: "sm" | "lg";
};

const Button: React.FC<Props> = ({
  children,
  onClick,
  disabled,
  loading,
  size = "lg",
}) => {
  return (
    <button
      className={clsx({
        [styles.button]: true,
        [styles.sm]: size === "sm",
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {!loading && children}
      {loading && <LoadingSpinner />}
    </button>
  );
};

export default Button;
