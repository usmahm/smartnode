import Dashboard from "@/components/Dashboard/Dashboard";
import Layout from "@/components/UIUnits/Layout/Layout";
import React from "react";

const DashboardPage = () => {
  return (
    <Layout headerType="AUTH">
      <Dashboard />
    </Layout>
  );
};

export default DashboardPage;
