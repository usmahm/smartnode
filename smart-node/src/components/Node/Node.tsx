"use client";

import React, { useState } from "react";
import styles from "./Node.module.scss";
import SubHeader from "../UIUnits/Header/SubHeader/SubHeader";
import NodeStateIcon from "@/assets/icons/nodeStateIcon.svg";
import IconButton from "../UIUnits/Buttons/IconButton/IconButton";
import Input from "../UIUnits/Input/Input";
import Button from "../UIUnits/Buttons/Button";

const Node = () => {
  const [onTime, setOnTime] = useState<string>("00:00");
  const [offTime, setOffTime] = useState<string>("");
  const [offAfterTime, setOffAfterTime] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");

  return (
    <>
      <SubHeader
        title={`Node: [Name]`}
        subTitle="Perform actions on node"
        rightComponent={
          <IconButton icon={<NodeStateIcon height={24} />} onClick={() => {}} />
        }
      />
      <div className={styles.wrapper}>
        <Input
          title="Turn on at"
          value={onTime}
          onChange={(val) => setOnTime(val)}
          placeholder="00:00"
        />
        <Input
          title="Turn off at"
          value={offTime}
          onChange={(val) => setOffTime(val)}
          placeholder="00:00"
        />
        <p className={styles.divider}>OR</p>
        <Input
          title="Turn off after(min)"
          value={offAfterTime}
          onChange={(val) => setOffAfterTime(val)}
          placeholder="00:00"
        />
        <Input
          title="Frequency"
          value={frequency}
          type="DROPDOWN"
          options={[
            {
              id: "Once",
              val: "Once",
            },
            {
              id: "Daily",
              val: "Daily",
            },
          ]}
          onChange={(val) => setFrequency(val)}
          placeholder="Select frequency"
        />
        <div className={styles.btn}>
          <Button onClick={() => {}}>Activate</Button>
        </div>
      </div>
    </>
  );
};

export default Node;
