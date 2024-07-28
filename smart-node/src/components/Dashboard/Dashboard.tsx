"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SubHeader from "../UIUnits/Header/SubHeader/SubHeader";
import NoContentIcon from "@/assets/icons/noContentIcon.svg";
import Button from "../UIUnits/Buttons/Button";
import GroupCard from "../UIUnits/GroupCard/GroupCard";
import { useNodeContext } from "@/contexts/NodeContext";
import NodeStateIcon from "@/assets/icons/nodeStateIcon.svg";
import NodeStateIconOn from "@/assets/icons/nodeStateIconOn.svg";
import GroupIcon from "@/assets/icons/groupIcon.svg";
import LoadingSpinner from "../UIUnits/LoadingSpinner/LoadingSpinner";
import styles from "./Dashboard.module.scss";
import { toast } from "react-toastify";
import { NodeType } from "@/@types/nodeTypes";

const Dashboard = () => {
  const router = useRouter();
  const {
    loadUserGroups,
    loadingGroups,
    groups,
    changeNodeState,
    changingNodeState,
  } = useNodeContext();
  const [loading, setLoading] = useState(true);

  const toggleNodeStateHandler = async (data: {
    name: string;
    nodeId: string;
    groupId: string;
    state: NodeType["state"];
  }) => {
    const newState = data.state === "0" ? "1" : "0";
    const success = await changeNodeState(data.nodeId, data.groupId, newState);

    if (success) {
      toast.success(`${data.name} switched ${newState === "1" ? "ON" : "OFF"}`);
    }
  };

  useEffect(() => {
    console.log(groups);
  }, [groups]);

  let content = <></>;
  if (loadingGroups) {
    content = (
      <div className={styles.loading}>
        <LoadingSpinner />
      </div>
    );
  } else {
    if (groups && groups.length) {
      content = (
        <div className={styles.container}>
          <h3 className={styles.groups}>Groups</h3>
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              groupId={group.id}
              name={group.name}
              items={group.nodes}
              groupIcon={<GroupIcon width={24} />}
              groupItemCTA={(data) => (
                <>
                  {changingNodeState === data.nodeId && (
                    <div className={styles.right}>
                      <LoadingSpinner sizedExtern />
                    </div>
                  )}
                  {changingNodeState !== data.nodeId && (
                    <button
                      onClick={() => toggleNodeStateHandler(data)}
                      className={styles.right}
                    >
                      {data.state === "0" ? (
                        <NodeStateIcon width={18} />
                      ) : (
                        <NodeStateIconOn width={18} />
                      )}{" "}
                    </button>
                  )}
                </>
              )}
              noItemText="No Node"
            />
          ))}
        </div>
      );
    } else {
      content = (
        <div className={styles.noContent}>
          <NoContentIcon />
          <h3>No Nodes Found</h3>
          <p>
            If you have the physical nodes, you can add them to your dashboard
            to control them.
          </p>
          <Button onClick={() => router.push("/node/activate")}>
            Add New Node
          </Button>
        </div>
      );
    }
  }

  return (
    <>
      <SubHeader
        title="Dashboard"
        subTitle="Control your nodes and view usage data"
      />
      {content}
    </>
  );
};

export default Dashboard;
