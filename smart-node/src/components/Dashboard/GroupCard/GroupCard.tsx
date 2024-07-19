import React, { useState } from "react";
import { useRouter } from "next/navigation";
import GroupIcon from "@/assets/icons/groupIcon.svg";
import NodeIcon from "@/assets/icons/socketIcon.svg";
import ArrowDownIcon from "@/assets/icons/arrowDownIcon.svg";
import NodeStateIcon from "@/assets/icons/nodeStateIcon.svg";
import styles from "./GroupCard.module.scss";
import clsx from "clsx";

type Props = {
  name: string;
  nodes: string[];
};

const GroupCard: React.FC<Props> = ({ name, nodes }) => {
  const router = useRouter();
  const [showNodes, setShowNodes] = useState(false);

  return (
    <div className={styles.group}>
      <button
        onClick={() => setShowNodes((prev) => !prev)}
        className={styles.groupBtn}
      >
        <span className={styles.left}>
          <GroupIcon />
          <p>{name}</p>
        </span>

        <span
          className={clsx({
            [styles.right]: true,
            [styles.isOpen]: showNodes,
          })}
        >
          <ArrowDownIcon />
        </span>
      </button>
      {showNodes &&
        nodes.map((node) => (
          <button
            key={node}
            onClick={() => router.push(`/node/${node}`)}
            className={styles.node}
          >
            <span className={styles.left}>
              <NodeIcon />
              <p>{node}</p>
            </span>

            <button className={styles.right}>
              <NodeStateIcon />
            </button>
          </button>
        ))}
    </div>
  );
};

export default GroupCard;
