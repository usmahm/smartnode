"use client";

import React from "react";
import ActivateNodeForm from "@/components/forms/ActivateNodeForm/ActivateNodeForm";
import withAuth from "@/shared/hocs/withAuth";

const ActivateNodePage = () => {
  return <ActivateNodeForm />;
};

export default withAuth(ActivateNodePage);
