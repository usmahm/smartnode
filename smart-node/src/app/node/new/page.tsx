import React from "react";
import NewNodeForm from "@/components/NewNodeForm/NewNodeForm";
import Layout from "@/components/UIUnits/Layout/Layout";

const NewNodePage = () => {
  return (
    <Layout headerType="AUTH">
      <NewNodeForm />
    </Layout>
  );
};

export default NewNodePage;
