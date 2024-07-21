import React from "react";
import Login from "@/components/Authentication/Login/Login";
import Layout from "@/components/UIUnits/Layout/Layout";

const LoginPage = () => {
  return (
    <Layout headerType="UNAUTH">
      <Login />
    </Layout>
  );
};

export default LoginPage;
