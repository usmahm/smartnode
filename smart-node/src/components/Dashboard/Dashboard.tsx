"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Dashboard.module.scss";
import SubHeader from "../UIUnits/Header/SubHeader/SubHeader";
import NoContentIcon from "@/assets/icons/noContentIcon.svg";
import Button from "../UIUnits/Buttons/Button";
import GroupCard from "./GroupCard/GroupCard";
import { useNodeContext } from "@/contexts/NodeContext";
import LoadingSpinner from "../UIUnits/LoadingSpinner/LoadingSpinner";

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
            <GroupCard key={group.name} name={group.name} nodes={group.nodes} />
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
