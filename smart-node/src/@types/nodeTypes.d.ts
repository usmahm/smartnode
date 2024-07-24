export type NodeType = {
  id: string;
  name: string;
  last_state_change: string;
  is_online: boolean;
  state: boolean;
  state_duration: number;
}

export type GroupType = {
  id: string;
  name: string;
  nodes: NodeType[];
}

export type AdminUserNodesType = {
  [user_id: string]: Pick<NodeType, 'id' | 'name'>[]
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
  type: string;
  group_id: string;
  node_id: string;
}