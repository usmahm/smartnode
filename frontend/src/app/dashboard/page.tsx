"use client";

import React from "react";
import withAuth from "@/shared/hocs/withAuth";
import Dashboard from "@/components/Dashboard/Dashboard";

const DashboardPage = () => {
  return <Dashboard />;
};

export default withAuth(DashboardPage);
