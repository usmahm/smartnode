"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./NewNodeForm.module.scss";
import SubHeader from "../../UIUnits/Header/SubHeader/SubHeader";
import Input, { OptionType } from "../../UIUnits/Input/Input";
import Button from "../../UIUnits/Buttons/Button";
import { useAdminContext } from "@/contexts/AdminContext";
import { useRouter } from "next/navigation";
import { NODE_TYPES } from "@/utils/constants";

const NewNodeForm = () => {
  const router = useRouter();
  const { createNewNode, setActiveView, creatingNode } = useAdminContext();
  const [type, setType] = useState<OptionType | null>(null);

  const onSubmit = async () => {
    if (type) {
      await createNewNode(type.id);
      setActiveView("NOT_ACTIVATED");
      router.push("/admin");
    } else {
      toast.error("Please select a node type!");
    }
  };

  return (
    <>
      <SubHeader
        title="Create New Node"
        subTitle="Creates new node for an hardware"
      />
      <div className={styles.wrapper}>
        <Input
          title="Type"
          value={(type && type.name) || ""}
          type="DROPDOWN"
          options={NODE_TYPES.map((type) => ({
            id: type,
            name: type.split("_").join(" "),
          }))}
          onChange={(val) => typeof val !== "string" && setType(val)}
          placeholder="Select node's type"
        />
        <div className={styles.btn}>
          <Button
            onClick={onSubmit}
            loading={creatingNode}
            disabled={creatingNode}
          >
            Create Node
          </Button>
        </div>
      </div>
    </>
  );
};

export default NewNodeForm;
