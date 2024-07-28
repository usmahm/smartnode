"use client";

import { redirect, useRouter, usePathname } from "next/navigation";
import { getToken } from "../../../api/api";
import React, { ComponentType, useEffect, useState } from "react";
import Layout from "@/components/UIUnits/Layout/Layout";
import { useAdminContext } from "@/contexts/AdminContext";
import { useUserContext } from "@/contexts/UserContext";

interface WithAuthProps {}

const withAuth = <P extends object>(
  Component: ComponentType<P>
): React.FC<P & WithAuthProps> => {
  const AuthComponent: React.FC<P & WithAuthProps> = (props) => {
    const router = useRouter();
    const { user } = useUserContext();
    const { adminIds } = useAdminContext();
    const pathname = usePathname();
    const [isAuth, setIsAuth] = useState(false);

    const adminPaths = ["/admin", "/admin/node/new"];

    useEffect(() => {
      // redirect to login if not authenticated
      // redirect to dashboard if trying to access admin routes but not admin
      const token = getToken();
      if (!token) {
        redirect("/login");
      } else {
        if (!(pathname in adminPaths)) {
          setIsAuth(true);
        } else if (adminIds) {
          if (user && !adminIds.includes(user?.id)) {
            redirect("/dashboard");
          } else if (user) {
            setIsAuth(true);
          }
        }
      }
    }, [router, adminIds, user, pathname, adminPaths]);

    return isAuth ? (
      <Layout headerType="AUTH">
        <Component {...props} />
      </Layout>
    ) : null;
  };

  return AuthComponent;
};

export default withAuth;
