import React, { useState } from "react";
import { useRouter } from "next/navigation";
import GroupIcon from "@/assets/icons/groupIcon.svg";
import NodeIcon from "@/assets/icons/socketIcon.svg";
import ArrowDownIcon from "@/assets/icons/arrowDownIcon.svg";
import NodeStateIcon from "@/assets/icons/nodeStateIcon.svg";
import styles from "./GroupCard.module.scss";
import clsx from "clsx";
import { NodeType } from "@/@types/nodeTypes";
import GroupItem from "./GroupItem/GroupItem";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

type Props = {
  name: string;
  items: {
    id: string;
    name: string;
  }[];
  onOpen?: () => void;
  groupIcon: JSX.Element;
  groupItemCTA: (itemId: string) => JSX.Element;
  onClickItem?: (itemId: string) => void;
  noItemText: string;
  loadingItems?: boolean;
};

const GroupCard: React.FC<Props> = ({
  name,
  items,
  onOpen,
  groupIcon,
  groupItemCTA,
  onClickItem,
  noItemText,
  loadingItems,
}) => {
  const router = useRouter();
  const [showNodes, setShowNodes] = useState(false);

  // const heyy = <GroupIcon width={24} />;
  return (
    <div className={styles.group}>
      <button
        onClick={() => {
          if (onOpen) onOpen();
          setShowNodes((prev) => !prev);
        }}
        className={styles.groupBtn}
      >
        <span className={styles.left}>
          {/* <GroupIcon width={24} /> */}
          {groupIcon}
          <p>{name}</p>
        </span>

        <span
          className={clsx({
            [styles.right]: true,
            [styles.isOpen]: showNodes,
          })}
        >
          <ArrowDownIcon width={24} />
        </span>
      </button>
      {showNodes && (
        <>
          {items.map((item) => (
            <GroupItem
              key={item.id}
              name={item.name}
              onClick={() => onClickItem && onClickItem(item.id)}
              itemCTA={groupItemCTA(item.id)}
            />
            // <button
            //   key={item.id}
            //   onClick={() => router.push(`/node/${item.id}`)}
            //   className={styles.item}
            // >
            //   <span className={styles.left}>
            //     <NodeIcon width={18} />
            //     <p>{item.name}</p>
            //   </span>

            //   {groupItemCTA(item.id)}
            //   {/* <button className={styles.right}>
            //     <NodeStateIcon width={18} />
            //   </button> */}
            // </button>
          ))}
          {loadingItems && (
            <div className={styles.i}>
              <LoadingSpinner />
            </div>
          )}
          {items.length === 0 && !loadingItems && (
            <div className={styles.i}>
              <p>{noItemText}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GroupCard;
