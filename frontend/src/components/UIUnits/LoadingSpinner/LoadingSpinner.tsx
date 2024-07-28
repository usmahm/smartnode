import React from "react";
import styles from "./LoadingSpinner.module.scss";
import clsx from "clsx";

type Props = {
  sizedExtern?: boolean;
};

const LoadingSpinner: React.FC<Props> = ({ sizedExtern }) => {
  return (
    <div
      className={clsx({
        [styles.loader]: true,
        [styles.sizeExtern]: sizedExtern,
      })}
    />
  );
};

export default LoadingSpinner;
