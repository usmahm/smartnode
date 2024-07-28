import { NODE_TYPES } from "@/utils/constants";

export type NodeType = {
  id: string;
  name: string;
  last_state_change: string;
  is_online: boolean;
  state: "1" | "0";
  state_duration: number;
  type: typeof NODE_TYPES[number];
}

export type GroupType = {
  id: string;
  name: string;
  nodes: NodeType[];
}

export type AdminUserNodesType = {
  [user_id: string]: Pick<NodeType, 'id' | 'name' | "type">[]
}
// export type AdminGroupType = {
//   id: string;
//   name: string;
//   nodes: Pick<NodeType, 'id' | 'name'>
// }

export type AdminUserWithGroup = {

}

export type ActivateNodePayloadType = {
  name: string;
  group_id: string;
  // type: string;
  // node_id: string;
}

export type NodeChangeStateResponse = Pick<NodeType, 'id' | 'state' | 'state_duration'>