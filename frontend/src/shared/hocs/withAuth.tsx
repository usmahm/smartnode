"use client";

import { redirect, useRouter, usePathname } from "next/navigation";
import { getToken } from "../../../api/api";
import React, { ComponentType, useEffect, useState } from "react";
import Layout from "@/components/UIUnits/Layout/Layout";
import { useAdminContext } from "@/contexts/AdminContext";
import { useUserContext } from "@/contexts/UserContext";

interface WithAuthProps {}
const adminPaths = ["/admin", "/admin/node/new"];

const withAuth = <P extends object>(
  Component: ComponentType<P>
): React.FC<P & WithAuthProps> => {
  const AuthComponent: React.FC<P & WithAuthProps> = (props) => {
    const router = useRouter();
    const { user } = useUserContext();
    const { adminIds } = useAdminContext();
    const pathname = usePathname();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
      // redirect to login if not authenticated
      // redirect to dashboard if trying to access admin routes but not admin
      const token = getToken();
      if (!token) {
        redirect("/login");
      } else {
        // if (!(pathname in adminPaths)) {
        console.log(
          "HEYYY 323",
          pathname,
          adminPaths,
          !adminPaths.includes(pathname)
        );
        if (!adminPaths.includes(pathname)) {
          setIsAuth(true);
        } else if (adminIds) {
          // console.log("HEYYY sdsdsd", adminIds, user?.id);
          if (user && !adminIds.includes(user?.id)) {
            redirect("/dashboard");
          } else if (user) {
            setIsAuth(true);
          }
        }
      }
    }, [router, adminIds, user, pathname]);

    return isAuth ? (
      <Layout headerType="AUTH">
        <Component {...props} />
      </Layout>
    ) : null;
  };

  return AuthComponent;
};

export default withAuth;
