import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../api/api";
import {
  ActivateNodePayloadType,
  GroupType,
  NodeChangeStateResponse,
  NodeType,
} from "@/@types/nodeTypes";
import { useUserContext } from "./UserContext";
import { ApiResponseType } from "@/@types/apiTypes";
import { showApiErrorToast } from "@/utils/functions";

type NodeContextType = {
  loadUserGroups: () => Promise<void>;
  activateNode: (
    nodeId: string,
    payload: ActivateNodePayloadType
  ) => Promise<boolean>;
  createGroup: (name: string) => Promise<GroupType | null>;
  changeNodeState: (
    nodeId: string,
    groupId: string,
    state: NodeType["state"],
    duration?: number
  ) => Promise<boolean>;
  loadingGroups: boolean;
  creatingGroup: boolean;
  activatingNode: boolean;
  changingNodeState: string;
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
  const [creatingGroup, setCreatingGroups] =
    useState<NodeContextType["creatingGroup"]>(false);
  const [activatingNode, setActivatingNode] =
    useState<NodeContextType["activatingNode"]>(false);
  const [changingNodeState, setChangingNodeState] =
    useState<NodeContextType["changingNodeState"]>("");

  const loadUserGroups = async () => {
    setLoadingGroups(true);
    try {
      const res: ApiResponseType<{ groups: GroupType[] }> = await api.get(
        "/groups"
      );

      if (res.data) {
        setGroups(res.data.groups);
      }
    } catch (err) {
      // // console.log(err);
      showApiErrorToast();
    }
    setLoadingGroups(false);
  };

  const createGroup: NodeContextType["createGroup"] = async (name) => {
    setCreatingGroups(true);
    try {
      const res: ApiResponseType<{ group: GroupType }> = await api.post(
        "/groups",
        { name }
      );

      if (res.data) {
        setGroups((prev) => {
          if (res.data) {
            if (!prev) return [res.data.group];
            return [...prev, res.data.group];
          }
          return prev;
        });

        setCreatingGroups(false);
        return res.data.group;
      }
    } catch (err) {
      // // console.log(err);
      showApiErrorToast();
    }

    setCreatingGroups(false);
    return null;
  };

  const activateNode: NodeContextType["activateNode"] = async (
    nodeId,
    payload
  ) => {
    setActivatingNode(true);
    try {
      const res: ApiResponseType<{ node: NodeType }> = await api.post(
        `/nodes/${nodeId}/activate`,
        payload
      );

      if (res.data) {
        const activatedNode = res.data.node;
        const groupId = payload.group_id;

        setGroups((prev) => {
          if (!prev) return prev;
          return prev.map((group) => {
            if (group.id === groupId) {
              return {
                ...group,
                nodes: [activatedNode, ...group.nodes],
              };
            }
            return group;
          });
        });
      }

      if (res.data) {
        return true;
      }
    } catch (err: any) {
      // // console.log("err", err);
      if (err.message === "Node doen't exist") {
        showApiErrorToast("Node doen't exist");
      } else {
        showApiErrorToast();
      }
    }

    setActivatingNode(false);
    return false;
  };

  const changeNodeState: NodeContextType["changeNodeState"] = async (
    nodeId,
    groupId,
    state,
    duration
  ) => {
    let success = false;
    setChangingNodeState(nodeId);
    try {
      const res: ApiResponseType<{ node: NodeChangeStateResponse }> =
        await api.post(`/nodes/${nodeId}/state`, { state, duration });

      if (res.success) {
        setGroups((prev) => {
          if (!prev) return prev;

          return prev.map((group) => {
            if (group.id === groupId) {
              const groupNodes = group.nodes.map((node) => {
                if (node.id === nodeId) {
                  return {
                    ...node,
                    state,
                    state_duration: duration || 0,
                  };
                }
                return node;
              });

              return {
                ...group,
                nodes: groupNodes,
              };
            }

            return group;
          });
        });

        success = true;
      }
    } catch (err: any) {
      showApiErrorToast(err?.message);
    }

    setChangingNodeState("false");
    return success;
  };

  useEffect(() => {
    // Load groups if authenticated
    if (!user && !groups) return;

    loadUserGroups();
  }, [user]);

  return (
    <NodeContext.Provider
      value={{
        groups,
        loadUserGroups,
        createGroup,
        activateNode,
        changeNodeState,
        loadingGroups,
        activatingNode,
        creatingGroup,
        changingNodeState,
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
