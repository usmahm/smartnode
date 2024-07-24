import { LoginSuccesssResType, UserType } from "@/@types/userTypes";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

type UserContextType = {
  user: UserType | null;
  loginHandler: (email: string, password: string) => Promise<boolean>;
  signupHandler: (userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => Promise<boolean>;
  logoutHandler: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [user, setuser] = useState<UserType | null>(null);
  // const [token, setToken] = useState("");

  const loginHandler: UserContextType["loginHandler"] = async (
    email,
    password
  ) => {
    let returnVal = false;

    try {
      const res: AxiosResponse<LoginSuccesssResType> = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      if (res.data.data) {
        sessionStorage.setItem("token", res.data.data.access_token);
        setuser(res.data.data.user);
        toast.success("Login Successful");

        console.log("HEYY Login", res.data);
        returnVal = true;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data.message}`);
        console.log("HEYY ERROR", error.response);
      }
    }

    return returnVal;
  };

  const signupHandler: UserContextType["signupHandler"] = async (userData) => {
    let returnVal = false;

    try {
      const res: AxiosResponse<LoginSuccesssResType> = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`,
        userData
      );

      console.log("HEYY Signup", res);
      if (res.data.data) {
        sessionStorage.setItem("token", res.data.data.access_token);
        setuser(res.data.data.user);
        toast.success("Signup Successful");

        returnVal = true;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data.message}`);
        console.log("HEYY ERROR", error.response);
      }
    }

    return returnVal;
  };

  const logoutHandler = () => {
    try {
      sessionStorage.removeItem("token");
      router.push("/login");
    } catch {}
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loginHandler,
        signupHandler,
        logoutHandler,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const value = useContext(UserContext);

  if (!value) {
    throw new Error("useUserContext must be inside a UserContext Provider.");
  }

  return value;
};
