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
  groupId?: string;
  items: (Pick<NodeType, "id" | "name"> & { state?: NodeType["state"] })[];
  onOpen?: () => void;
  groupIcon: JSX.Element;
  groupItemCTA: (data: {
    name: string;
    nodeId: string;
    groupId: string;
    state: NodeType["state"];
  }) => JSX.Element;
  onClickItem?: (itemId: string) => void;
  noItemText: string;
  loadingItems?: boolean;
};

const GroupCard: React.FC<Props> = ({
  name,
  groupId,
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
              itemCTA={
                groupId ? (
                  groupItemCTA({
                    name: item.name,
                    nodeId: item.id,
                    groupId,
                    state: item.state || "0",
                  })
                ) : (
                  <></>
                )
              }
            />
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
