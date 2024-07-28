"use client";

import React from "react";
import Node from "@/components/Node/Node";
import withAuth from "@/shared/hocs/withAuth";

const NodePage = () => {
  return <Node />;
};

export default withAuth(NodePage);
