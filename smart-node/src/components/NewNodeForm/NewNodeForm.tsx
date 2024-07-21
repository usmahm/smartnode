"use client";

import React, { useState } from "react";
import styles from "./NewNodeForm.module.scss";
import SubHeader from "../UIUnits/Header/SubHeader/SubHeader";
import NodeStateIcon from "@/assets/icons/nodeStateIcon.svg";
import IconButton from "../UIUnits/Buttons/IconButton/IconButton";
import Input from "../UIUnits/Input/Input";
import Button from "../UIUnits/Buttons/Button";

const NewNodeForm = () => {
  const [name, setName] = useState<string>("00:00");
  const [type, setType] = useState<string>("");
  const [group, setGroup] = useState<string>("");
  const [newGroup, setNewGroup] = useState<string>("");
  const [icon, setIcon] = useState<string>("");

  return (
    <>
      <SubHeader
        title="Create New Node"
        subTitle="Create new node to generate node id for your physical node"
      />
      <div className={styles.wrapper}>
        <Input
          title="Name"
          value={name}
          onChange={(val) => setName(val)}
          placeholder="Enter node's name"
        />
        <Input
          title="Type"
          value={type}
          type="DROPDOWN"
          options={[
            {
              id: "Type 1",
              val: "Type 1",
            },
            {
              id: "Type 2",
              val: "Type 2",
            },
          ]}
          onChange={(val) => setType(val)}
          placeholder="Select node's type"
        />
        <Input
          title="Node Icon"
          value={icon}
          type="DROPDOWN"
          options={[
            {
              id: "Icon 1",
              val: "Icon 1",
            },
            {
              id: "Icon 2",
              val: "Icon 2",
            },
          ]}
          onChange={(val) => setIcon(val)}
          placeholder="Select node's icon"
        />
        <Input
          title="Group"
          value={group}
          type="DROPDOWN"
          options={[
            {
              id: "Group 1",
              val: "Group 1",
            },
            {
              id: "Group 2",
              val: "Group 2",
            },
          ]}
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
