import { LoginSuccesssResType, UserType } from "@/@types/userTypes";
import { parseJwt } from "@/utils/functions";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";
import { ApiResponseType } from "@/@types/apiTypes";

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
  const [user, setUser] = useState<UserType | null>(null);
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
        setUser(res.data.data.user);
        toast.success("Login Successful");

        returnVal = true;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data.message}`);
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

      if (res.data.data) {
        // [FIX]: Fix for demo, fix later
        await loginHandler(userData.email, userData.password);
        // sessionStorage.setItem("token", res.data.data.access_token);
        // setUser(res.data.data.user);
        // // console.log("HEYYY 111", res.data);
        // toast.success("Signup Successful");

        returnVal = true;
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data.message}`);
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

  const fetchUserDetails = async (userId: string) => {
    const res: ApiResponseType<{ user: UserType }> = await api.get(
      `/users/${userId}`
    );

    if (res.data) {
      setUser(res.data.user);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const parsed = parseJwt(token);

      if (parsed.id) {
        fetchUserDetails(parsed.id);
      }
    }
  }, []);

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
