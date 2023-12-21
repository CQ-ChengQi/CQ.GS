import { Node, Edge } from "reactflow";

export type EdgeData = {
  label: string;
};

export type NodeData = {
  label: string;
  width?: number;
  height?: number;
};

export type MyNode = Node<NodeData>;
export type MyEdge = Edge<EdgeData>;

export type ReactFlowContextType = {
  nodes: Array<MyNode>;
  addNode: () => MyNode | void;
};
