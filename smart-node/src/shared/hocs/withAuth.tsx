"use client";

import { useRouter } from "next/navigation";
import { getToken } from "../../../api/api";
import React, { ComponentType, useEffect, useState } from "react";
import Layout from "@/components/UIUnits/Layout/Layout";

interface WithAuthProps {}

const withAuth = <P extends object>(
  Component: ComponentType<P>
): React.FC<P & WithAuthProps> => {
  const AuthComponent: React.FC<P & WithAuthProps> = (props) => {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
      const token = getToken();

      if (!token) {
        router.push("/login");
      } else {
        setIsAuth(true);
      }
    }, [router]);

    return isAuth ? (
      <Layout headerType="AUTH">
        <Component {...props} />
      </Layout>
    ) : null;
  };

  return AuthComponent;
};

export default withAuth;
