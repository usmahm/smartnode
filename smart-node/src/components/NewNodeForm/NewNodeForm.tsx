"use client";

import React, { useState } from "react";
import styles from "./NewNodeForm.module.scss";
import SubHeader from "../UIUnits/Header/SubHeader/SubHeader";
import NodeStateIcon from "@/assets/icons/nodeStateIcon.svg";
import IconButton from "../UIUnits/Buttons/IconButton/IconButton";
import Input from "../UIUnits/Input/Input";
import Button from "../UIUnits/Buttons/Button";
import { useNodeContext } from "@/contexts/NodeContext";

const NewNodeForm = () => {
  const { groups } = useNodeContext();

  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [group, setGroup] = useState<string>("");
  const [newGroup, setNewGroup] = useState<string>("");
  // const [icon, setIcon] = useState<string>("");
  const [nodeId, setNodeId] = useState<string>("");

  return (
    <>
      <SubHeader
        title="Setup New Node"
        // subTitle="Create new node to generate node id for your physical node"
        subTitle="Add new node's id to your account"
      />
      <div className={styles.wrapper}>
        <Input
          title="Name"
          value={name}
          onChange={(val) => setName(val)}
          placeholder="Enter node's name"
        />
        <Input
          title="Node's ID"
          value={nodeId}
          onChange={(val) => setNodeId(val)}
          placeholder="Enter node's product id"
        />
        <Input
          title="Type"
          value={type}
          type="DROPDOWN"
          options={[
            {
              id: "Type 1",
              name: "Type 1",
            },
            {
              id: "Type 2",
              name: "Type 2",
            },
          ]}
          onChange={(val) => setType(val)}
          placeholder="Select node's type"
        />
        {/* <Input
          title="Node Icon"
          value={icon}
          type="DROPDOWN"
          options={[
            {
              id: "Icon 1",
              name: "Icon 1",
            },
            {
              id: "Icon 2",
              name: "Icon 2",
            },
          ]}
          onChange={(val) => setIcon(val)}
          placeholder="Select node's icon"
        /> */}
        <Input
          title="Group"
          value={group}
          type="DROPDOWN"
          options={groups || []}
          onChange={(val) => setGroup(val)}
          placeholder="Select node's group"
        />
        <p className={styles.divider}>OR</p>
        <Input
          title="Create New Group"
          value={newGroup}
          onChange={(val) => setNewGroup(val)}
          placeholder="Enter group name"
        />

        <Button onClick={() => {}}>Create Group</Button>

        <div className={styles.btn}>
          <Button onClick={() => {}}>Create Node</Button>
        </div>
      </div>
    </>
  );
};

export default NewNodeForm;
