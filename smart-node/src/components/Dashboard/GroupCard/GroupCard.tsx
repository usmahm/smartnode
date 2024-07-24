import React, { useState } from "react";
import { useRouter } from "next/navigation";
import GroupIcon from "@/assets/icons/groupIcon.svg";
import NodeIcon from "@/assets/icons/socketIcon.svg";
import ArrowDownIcon from "@/assets/icons/arrowDownIcon.svg";
import NodeStateIcon from "@/assets/icons/nodeStateIcon.svg";
import styles from "./GroupCard.module.scss";
import clsx from "clsx";
import { NodeType } from "@/@types/nodeTypes";

type Props = {
  name: string;
  nodes: NodeType[];
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
          <GroupIcon width={24} />
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
      {showNodes &&
        nodes.map((node) => (
          <button
            key={node.id}
            onClick={() => router.push(`/node/${node.id}`)}
            className={styles.node}
          >
            <span className={styles.left}>
              <NodeIcon width={18} />
              <p>{node.name}</p>
            </span>

            <button className={styles.right}>
              <NodeStateIcon width={18} />
            </button>
          </button>
        ))}
    </div>
  );
};

export default GroupCard;
