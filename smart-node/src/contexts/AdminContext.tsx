import { LoginSuccesssResType, UserType } from "@/@types/userTypes";
import axios, { AxiosError, AxiosResponse } from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";
import {
  ActivateNodePayloadType,
  AdminUserNodesType,
  GroupType,
} from "@/@types/nodeTypes";
import { useUserContext } from "./UserContext";

type AdminContextType = {
  loadAllUsers: () => Promise<void>;
  loadUserNodes: (userId: string) => Promise<void>;
  loadNotActivatedNodes: () => Promise<void>;
  createNewNode: (nodeType: string) => Promise<void>;
  resetNode: (node_id: string) => Promise<void>;
  loadAdminIds: (node_id: string) => Promise<void>;
  usersNodes: AdminUserNodesType;
  notActivatedNodes: AdminUserNodesType[""];
  adminIds: string[];
  loadingUserNodes: string;
  activatingNode: boolean;
  resettingNode: boolean;
  loadingUsers: boolean;
  loadingNotActivatedNodes: boolean;
};

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [adminIds, setAdminIds] = useState([]);
  const [usersNodes, setUsersNodes] = useState<AdminContextType["usersNodes"]>(
    {}
  );
  const [loadingUserNodes, setLoadingUserNodes] =
    useState<AdminContextType["loadingUserNodes"]>("");
  const [activatingNode, setActivatingNode] =
    useState<AdminContextType["activatingNode"]>(false);
  const [resettingNode, setResettingNode] =
    useState<AdminContextType["resettingNode"]>(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingNotActivatedNodes, setLoadingNotActivatedNodes] =
    useState(false);
  const [notActivatedNodes, setNotActivatedNodes] = useState<
    AdminContextType["notActivatedNodes"]
  >([]);

  const loadAllUsers = async () => {
    setLoadingUsers(true);
    try {
      const res: AxiosResponse<UserType[]> = await api.get("/admin/users");
      console.log("HEYY 111", res);
    } catch (err) {
      console.log(err);
    }
    setLoadingUsers(false);
  };

  const loadUserNodes: AdminContextType["loadUserNodes"] = async (userId) => {
    setLoadingUserNodes(userId);
    try {
      const res: AxiosResponse<AdminUserNodesType["s"]> = await api.get(
        `/admin/nodes?user_id=${userId}`
      );
      console.log("HEYY 222", res);
    } catch (err) {
      console.log(err);
    }
    setLoadingUserNodes("");
  };

  const loadNotActivatedNodes = async () => {
    setLoadingNotActivatedNodes(true);
    try {
      const res: AxiosResponse<AdminUserNodesType["s"]> = await api.get(
        "/admin/nodes/not-activated"
      );
      console.log("HEYY 333", res);
    } catch (err) {
      console.log(err);
    }
    setLoadingNotActivatedNodes(false);
  };

  const createNewNode = async (nodeType: string) => {
    setActivatingNode(true);
    try {
      const res: AxiosResponse<GroupType[]> = await api.post("/admin/nodes", {
        type: nodeType,
      });
      console.log("HEYY 444", res);
    } catch (err) {
      console.log("err", err);
    }
    setActivatingNode(false);
  };

  const resetNode: AdminContextType["resetNode"] = async (node_id) => {
    setResettingNode(true);
    try {
      const res: AxiosResponse<GroupType[]> = await api.post(
        `/admin/nodes/${node_id}/reset`
      );
      console.log("HEYY 555", res);
    } catch (err) {
      console.log("err", err);
    }
    setResettingNode(false);
  };

  const loadAdminIds = async () => {
    // setLoadingAdminIds(true);
    try {
      const res: AxiosResponse<string[]> = await api.get("/admin");
      console.log("HEYY 666", res);
    } catch (err) {
      console.log(err);
    }
    // setLoadingAdminIds(false);
  };

  return (
    <AdminContext.Provider
      value={{
        adminIds,
        usersNodes,
        notActivatedNodes,
        loadingNotActivatedNodes,
        activatingNode,
        resettingNode,
        loadingUsers,
        loadingUserNodes,
        loadUserNodes,
        createNewNode,
        resetNode,
        loadAllUsers,
        loadNotActivatedNodes,
        loadAdminIds,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const value = useContext(AdminContext);

  if (!value) {
    throw new Error("useAdminContext must be inside a AdminContext Provider.");
  }

  return value;
};
