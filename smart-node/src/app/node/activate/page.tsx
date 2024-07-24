"use client";

import React from "react";
import NewNodeForm from "@/components/NewNodeForm/NewNodeForm";
import withAuth from "@/shared/hocs/withAuth";

const ActivateNodePage = () => {
  return <NewNodeForm />;
};

export default withAuth(ActivateNodePage);
