import { LoginSuccesssResType, UserType } from "@/@types/userTypes";
import axios, { AxiosError, AxiosResponse } from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";
import { ActivateNodePayloadType, GroupType } from "@/@types/nodeTypes";
import { useUserContext } from "./UserContext";

type NodeContextType = {
  loadUserGroups: () => Promise<void>;
  activateNode: (payload: ActivateNodePayloadType) => Promise<void>;
  loadingGroups: boolean;
  activatingNode: boolean;
  groups: GroupType[] | null;
};

const NodeContext = createContext<NodeContextType | null>(null);

export const NodeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUserContext();
  const [groups, setGroups] = useState<NodeContextType["groups"]>(null);
  const [loadingGroups, setLoadingGroups] =
    useState<NodeContextType["loadingGroups"]>(true);
  const [activatingNode, setActivatingNode] =
    useState<NodeContextType["activatingNode"]>(false);

  const loadUserGroups = async () => {
    setLoadingGroups(true);
    try {
      const res: AxiosResponse<GroupType[]> = await api.get("/groups");
      console.log("HEYY 111", res);
    } catch (err) {
      console.log(err);
    }
    setLoadingGroups(false);
  };

  const activateNode = async (payload: ActivateNodePayloadType) => {
    setActivatingNode(true);
    try {
      const res: AxiosResponse<GroupType[]> = await api.post(
        "/nodes/activate",
        payload
      );
    } catch (err) {
      console.log("err", err);
    }
    setActivatingNode(false);
  };

  useEffect(() => {
    // Load groups if authenticated
    if (!user) return;

    loadUserGroups();
  }, []);

  return (
    <NodeContext.Provider
      value={{
        loadUserGroups,
        loadingGroups,
        activatingNode,
        groups,
        activateNode,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};

export const useNodeContext = () => {
  const value = useContext(NodeContext);

  if (!value) {
    throw new Error("useNodeContext must be inside a NodeContext Provider.");
  }

  return value;
};
