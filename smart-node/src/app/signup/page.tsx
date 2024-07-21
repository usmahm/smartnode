import React from "react";
import Signup from "@/components/Authentication/Signup/Signup";
import Layout from "@/components/UIUnits/Layout/Layout";

const SignupPage = () => {
  return (
    <Layout headerType="UNAUTH">
      <Signup />
    </Layout>
  );
};

export default SignupPage;
