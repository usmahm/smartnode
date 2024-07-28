import React from "react";
import NodeIcon from "@/assets/icons/socketIcon.svg";
import styles from "./GroupItem.module.scss";

type Props = {
  name: string;
  onClick?: () => void;
  itemCTA: JSX.Element;
};

const GroupItem: React.FC<Props> = ({ name, onClick, itemCTA }) => {
  return (
    <button onClick={onClick} className={styles.item}>
      <span className={styles.left}>
        <NodeIcon width={18} />
        <p>{name}</p>
      </span>

      {itemCTA}
    </button>
  );
};

export default GroupItem;
