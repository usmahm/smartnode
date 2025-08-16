// https://stackoverflow.com/questions/72238175/why-useeffect-running-twice-and-how-to-handle-it-well-in-react
import {
  AdminUserType,
  LoginSuccesssResType,
  UserType,
} from "@/@types/userTypes";
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
import { ApiResponseType } from "@/@types/apiTypes";

type ViewsType = "ACTIVATED" | "NOT_ACTIVATED";

type AdminContextType = {
  loadAllUsers: () => Promise<void>;
  loadUserNodes: (userId: string) => Promise<void>;
  loadNotActivatedNodes: () => Promise<void>;
  createNewNode: (nodeType: string) => Promise<void>;
  resetNode: (node_id: string, user_id: string) => Promise<void>;
  loadAdminIds: (node_id: string) => Promise<void>;
  setActiveView: (viewType: ViewsType) => void;
  usersNodes: AdminUserNodesType;
  notActivatedNodes: AdminUserNodesType[""] | null;
  adminIds: string[] | null;
  loadingUserNodes: string;
  activeView: ViewsType;
  creatingNode: boolean;
  resettingNode: string;
  loadingUsers: boolean;
  loadingNotActivatedNodes: boolean;
  users: AdminUserType[] | null;
};

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeView, setActiveView] = useState<ViewsType>("ACTIVATED");
  const [adminIds, setAdminIds] = useState<AdminContextType["adminIds"]>(null);
  const [users, setUsers] = useState<AdminContextType["users"]>(null);
  const [usersNodes, setUsersNodes] = useState<AdminContextType["usersNodes"]>(
    {}
  );
  const [loadingUserNodes, setLoadingUserNodes] =
    useState<AdminContextType["loadingUserNodes"]>("");
  const [creatingNode, setCreatingNode] =
    useState<AdminContextType["creatingNode"]>(false);
  const [resettingNode, setResettingNode] =
    useState<AdminContextType["resettingNode"]>("");
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingNotActivatedNodes, setLoadingNotActivatedNodes] =
    useState(false);
  const [notActivatedNodes, setNotActivatedNodes] =
    useState<AdminContextType["notActivatedNodes"]>(null);

  const loadAllUsers = async () => {
    setLoadingUsers(true);
    try {
      const res: ApiResponseType<{ users: AdminUserType[] }> = await api.get(
        "/admin/users"
      );

      if (res.data) {
        setUsers(res.data.users);
      }
    } catch (err) {
      // // console.log(err);
    }
    setLoadingUsers(false);
  };

  const loadUserNodes: AdminContextType["loadUserNodes"] = async (userId) => {
    setLoadingUserNodes(userId);
    try {
      const res: ApiResponseType<{ nodes: AdminUserNodesType["s"] }> =
        await api.get(`/admin/nodes?user_id=${userId}`);

      if (res.data) {
        setUsersNodes((prev) => ({
          ...prev,
          [userId]: res.data!.nodes,
        }));
      }
    } catch (err) {
      // // console.log(err);
    }
    setLoadingUserNodes("");
  };

  const loadNotActivatedNodes = async () => {
    setLoadingNotActivatedNodes(true);
    try {
      const res: ApiResponseType<{ nodes: AdminUserNodesType["s"] }> =
        await api.get("/admin/nodes?not_activated=true");

      if (res.data) {
        setNotActivatedNodes(res.data.nodes);
      }
    } catch (err) {
      // // console.log(err);
    }
    setLoadingNotActivatedNodes(false);
  };

  const createNewNode = async (nodeType: string) => {
    setCreatingNode(true);

    try {
      const res: ApiResponseType<{ node: AdminUserNodesType[""][0] }> =
        await api.post("/admin/nodes", {
          type: nodeType,
        });

      // console.log("HEYY 444", res);
      if (res.data && notActivatedNodes) {
        setNotActivatedNodes((prev) => {
          if (res.data) {
            if (!prev) return [res.data.node];
            return [...prev, res.data.node];
          }
          return prev;
        });
      }
    } catch (err) {
      // console.log("err", err);
    }

    setCreatingNode(false);
  };

  const resetNode: AdminContextType["resetNode"] = async (nodeId, userId) => {
    setResettingNode(nodeId);
    try {
      await api.post(`/admin/nodes/${nodeId}/reset`);

      const nodeReset: AdminUserNodesType[""][0] | undefined = usersNodes[
        userId
      ].find((node) => node.id === nodeId);
      if (nodeReset) {
        setNotActivatedNodes((prev) => {
          if (!prev) return [nodeReset!];
          return [...prev, nodeReset!];
        });
      }

      setUsersNodes((prev) => {
        const newUserNodes = prev[userId].filter((node) => node.id !== nodeId);

        return {
          ...prev,
          [userId]: newUserNodes,
        };
      });
    } catch (err) {
      // // console.log("err", err);
    }
    setResettingNode("");
  };

  const loadAdminIds = async () => {
    // setLoadingAdminIds(true);
    try {
      const res: ApiResponseType<{ admins: string[] }> = await api.get(
        "/admin/ids"
      );

      if (res.data) {
        setAdminIds(res.data.admins);
      }
    } catch (err) {
      // // console.log(err);
    }
    // setLoadingAdminIds(false);
  };

  useEffect(() => {
    loadAdminIds();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        activeView,
        adminIds,
        usersNodes,
        users,
        notActivatedNodes,
        loadingNotActivatedNodes,
        creatingNode,
        resettingNode,
        loadingUsers,
        loadingUserNodes,
        loadUserNodes,
        createNewNode,
        resetNode,
        loadAllUsers,
        loadNotActivatedNodes,
        loadAdminIds,
        setActiveView,
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
