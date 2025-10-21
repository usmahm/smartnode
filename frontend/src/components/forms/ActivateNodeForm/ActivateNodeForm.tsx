"use client";

import React, { useState } from "react";
import styles from "./ActivateNodeForm.module.scss";
import SubHeader from "../../UIUnits/Header/SubHeader/SubHeader";
import NodeStateIcon from "@/assets/icons/nodeStateIcon.svg";
import IconButton from "../../UIUnits/Buttons/IconButton/IconButton";
import Input, { OptionType } from "../../UIUnits/Input/Input";
import Button from "../../UIUnits/Buttons/Button";
import { useNodeContext } from "@/contexts/NodeContext";
import { NODE_TYPES } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ActivateNodeForm = () => {
  const router = useRouter();
  const { groups, creatingGroup, createGroup, activateNode, activatingNode } =
    useNodeContext();

  const [name, setName] = useState<string>("");
  const [group, setGroup] = useState<OptionType | null>(null);
  const [newGroup, setNewGroup] = useState<string>("");
  // const [icon, setIcon] = useState<string>("");
  const [nodeId, setNodeId] = useState<string>("");

  const createGroupHandler = async () => {
    const group = await createGroup(newGroup);
    if (group) {
      toast.success("Group created successfully");
      setGroup(group);
    }
  };

  const completedFields = name && group && nodeId;

  const activateNodeHandler = async () => {
    if (completedFields) {
      const success = await activateNode(nodeId, {
        name,
        // type: type.id,
        group_id: group.id,
        // node_id: nodeId,
      });

      if (success) {
        toast.success("Node activated successfully");
        router.push("/dashboard");
      }
    }
  };

  return (
    <>
      <SubHeader
        title="Activate New Node"
        // subTitle="Create new node to generate node id for your physical node"
        subTitle="Add new node to your account"
      />
      <div className={styles.wrapper}>
        <Input
          title="Name"
          value={name}
          onChange={(val) => typeof val === "string" && setName(val)}
          placeholder="Enter node's name"
        />
        <Input
          title="Node's ID"
          value={nodeId}
          onChange={(val) => typeof val === "string" && setNodeId(val)}
          placeholder="Enter node's hardware id"
        />
        {/* <Input
          title="Type"
          value={(type && type.name) || ""}
          type="DROPDOWN"
          options={NODE_TYPES.map((type) => ({
            id: type,
            name: type.split("_").join(" "),
          }))}
          onChange={(val) => typeof val !== "string" && setType(val)}
          placeholder="Select node's type"
        /> */}
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
          onChange={(val) => typeof val !== "string" && setIcon(val)}
          placeholder="Select node's icon"
        /> */}
        <Input
          title="Group"
          value={(group && group.name) || ""}
          type="DROPDOWN"
          options={groups || []}
          onChange={(val) => typeof val !== "string" && setGroup(val)}
          placeholder="Select node's group"
        />
        <p className={styles.divider}>OR</p>
        <Input
          title="Create New Group"
          value={newGroup}
          onChange={(val) => typeof val === "string" && setNewGroup(val)}
          placeholder="Enter group name"
        />

        <Button
          disabled={!newGroup}
          loading={creatingGroup}
          onClick={createGroupHandler}
        >
          Create Group
        </Button>

        <div className={styles.btn}>
          <Button
            disabled={!completedFields}
            loading={activatingNode}
            onClick={activateNodeHandler}
          >
            Create Node
          </Button>
        </div>
      </div>
    </>
  );
};

export default ActivateNodeForm;
