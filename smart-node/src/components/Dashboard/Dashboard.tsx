"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./Dashboard.module.scss";
import SubHeader from "../UIUnits/Header/SubHeader/SubHeader";
import NoContentIcon from "@/assets/icons/noContentIcon.svg";
import Button from "../UIUnits/Buttons/Button";
import ContentWrapper from "../UIUnits/ContentWrapper/ContentWrapper";
import GroupCard from "./GroupCard/GroupCard";

const Dashboard = () => {
  const router = useRouter();

  const groups = [
    {
      name: "Living Room",
      nodes: ["Light", "Light", "Light"],
    },
    {
      name: "Kitchen",
      nodes: ["Light", "Light", "Light"],
    },
    {
      name: "Outside",
      nodes: ["Light", "Light", "Light"],
    },
    {
      name: "Bedroom",
      nodes: ["Light", "Light", "Light"],
    },
  ];

  const noContent = false;
  let content = <></>;
  if (noContent) {
    content = (
      <div className={styles.noContent}>
        <NoContentIcon />
        <h3>No Nodes Found</h3>
        <p>
          If you have the physical nodes, you can add them to your dashboard to
          control them.
        </p>
        <Button onClick={() => router.push("/create-node")}>Create Node</Button>
      </div>
    );
  } else {
    content = (
      <ContentWrapper>
        <>
          <h3 className={styles.groups}>Groups</h3>
          {groups.map((group) => (
            <GroupCard key={group.name} name={group.name} nodes={group.nodes} />
          ))}
        </>
      </ContentWrapper>
    );
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
