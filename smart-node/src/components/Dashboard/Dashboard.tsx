"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SubHeader from "../UIUnits/Header/SubHeader/SubHeader";
import NoContentIcon from "@/assets/icons/noContentIcon.svg";
import Button from "../UIUnits/Buttons/Button";
import GroupCard from "../UIUnits/GroupCard/GroupCard";
import { useNodeContext } from "@/contexts/NodeContext";
import NodeStateIcon from "@/assets/icons/nodeStateIcon.svg";
import GroupIcon from "@/assets/icons/groupIcon.svg";
import LoadingSpinner from "../UIUnits/LoadingSpinner/LoadingSpinner";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const router = useRouter();
  const { loadUserGroups, loadingGroups, groups } = useNodeContext();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   loadUserGroups();
  // }, []);

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
              key={group.name}
              name={group.name}
              items={group.nodes}
              groupIcon={<GroupIcon width={24} />}
              groupItemCTA={(itemId) => (
                <button onClick={() => {}} className={styles.right}>
                  <NodeStateIcon width={18} />
                </button>
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
          <Button onClick={() => router.push("/node/new")}>Create Node</Button>
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
