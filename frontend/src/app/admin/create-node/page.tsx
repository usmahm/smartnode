"use client";

import React from "react";
import NewNodeForm from "@/components/forms/NewNodeForm/NewNodeForm";
import withAuth from "@/shared/hocs/withAuth";

const CreateNodePage = () => {
  return <NewNodeForm />;
};

export default withAuth(CreateNodePage);
