"use client";

import React, { useEffect, useState } from "react";
import withAuth from "@/shared/hocs/withAuth";
import Layout from "@/components/UIUnits/Layout/Layout";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";

const AdminDashboardPage = () => {
  return <AdminDashboard />;
};

export default withAuth(AdminDashboardPage);
