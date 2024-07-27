"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import NoContentIcon from "@/assets/icons/noContentIcon.svg";
import { useAdminContext } from "@/contexts/AdminContext";
import UserIcon from "@/assets/icons/userIcon.svg";
import LoadingSpinner from "../UIUnits/LoadingSpinner/LoadingSpinner";
import GroupCard from "../UIUnits/GroupCard/GroupCard";
import Button from "../UIUnits/Buttons/Button";
import GroupItem from "../UIUnits/GroupCard/GroupItem/GroupItem";
import SubHeader from "../UIUnits/Header/SubHeader/SubHeader";
import styles from "./AdminDashboard.module.scss";

const AdminDashboard = () => {
  const router = useRouter();
  const {
    activeView,
    setActiveView,
    users,
    loadUserNodes,
    usersNodes,
    loadingUserNodes,
    loadAllUsers,
    loadingUsers,
    notActivatedNodes,
    loadNotActivatedNodes,
    loadingNotActivatedNodes,
    resetNode,
  } = useAdminContext();

  useEffect(() => {
    if (!users?.length && !loadingUsers) {
      loadAllUsers();
    }

    if (!notActivatedNodes?.length && !loadingNotActivatedNodes) {
      loadNotActivatedNodes();
    }
  }, []);

  const loadUserNodesHandler = (userId: string) => {
    if (userId in usersNodes) return;
    loadUserNodes(userId);
  };

  const copyToClipboardHandler = (nodeId: string) => {
    navigator.clipboard.writeText(nodeId);
    toast.success("Node ID Copied");
  };

  const renderContent = () => {
    let content = <></>;

    const loadingEl = (headerText: string) => (
      <div className={styles.container}>
        <h3 className={styles.header}>{headerText}</h3>
        <div className={styles.loading}>
          <LoadingSpinner />
        </div>
      </div>
    );

    const noContentEl = (text: string, headerText: string) => (
      <div className={styles.container}>
        <h3 className={styles.header}>{headerText}</h3>
        <div className={styles.noContent}>
          <NoContentIcon />
          <h3>{text}</h3>
        </div>
      </div>
    );

    const contentEl = (headerText: string, content?: JSX.Element) => (
      <div className={styles.container}>
        <h3 className={styles.header}>{headerText}</h3>
        {content}
      </div>
    );

    if (activeView === "ACTIVATED") {
      if (loadingUsers) {
        content = loadingEl("Users");
      } else if (users?.length) {
        content = contentEl(
          "Users",
          <>
            {users.map((user) => (
              <GroupCard
                key={user.id}
                name={`${user.first_name} ${user.last_name} - ID: ${user.id}`}
                items={usersNodes[user.id] || []}
                groupIcon={<UserIcon height={24} />}
                onOpen={() => loadUserNodesHandler(user.id)}
                groupItemCTA={(itemId) => (
                  <Button
                    onClick={() => resetNode(itemId, user.id)}
                    loading={itemId === ""}
                    disabled={itemId === ""}
                    size="sm"
                  >
                    Reset
                  </Button>
                )}
                noItemText="No Node Created"
                loadingItems={loadingUserNodes === user.id}
              />
            ))}
          </>
        );
      } else if (users?.length === 0) {
        content = noContentEl("No users found", "Users");
      } else {
        content = contentEl("Users");
      }
    } else {
      if (loadingNotActivatedNodes) {
        content = loadingEl("Nodes");
      } else if (notActivatedNodes?.length) {
        content = contentEl(
          "Nodes",
          <>
            {notActivatedNodes.map((node) => (
              <GroupItem
                key={node.id}
                name={`ID: ${node.id}`}
                itemCTA={
                  <Button
                    onClick={() => copyToClipboardHandler(node.id)}
                    size="sm"
                  >
                    Copy ID
                  </Button>
                }
              />
            ))}
          </>
        );
      } else if (notActivatedNodes?.length === 0) {
        content = noContentEl("No Non-Activated Node Found", "Nodes");
      } else {
        content = contentEl("Nodes");
      }
    }

    return content;
  };

  return (
    <>
      <SubHeader title="Admin Dashboard" subTitle="Manage all nodes" />
      <div className={styles.sectionBtns}>
        <button
          onClick={() => setActiveView("ACTIVATED")}
          className={activeView === "ACTIVATED" ? styles.active : undefined}
        >
          Activated
        </button>
        <button
          onClick={() => setActiveView("NOT_ACTIVATED")}
          className={activeView === "NOT_ACTIVATED" ? styles.active : undefined}
        >
          Not Activated
        </button>
      </div>
      {renderContent()}
    </>
  );
};

export default AdminDashboard;
