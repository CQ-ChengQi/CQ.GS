import { Node, Edge } from "reactflow";

export type EdgeData = {
  label: string;
};

export type NodeData = {
  content?: string;
  width?: number;
  height?: number;
  parentId?: string;
};

export type MyNode = Node<NodeData>;
export type MyEdge = Edge<EdgeData>;

export type ReactFlowContextType = {
  nodes: Array<MyNode>;
  edges: Array<MyEdge>;
  currentEditNode?: MyNode;
  setNodes: (value: React.SetStateAction<MyNode[]>) => void;
  setEdges: (value: React.SetStateAction<MyEdge[]>) => void;
  addNode: () => MyNode | void;
  setCurrentSelectedNode: (node: MyNode) => void;
  setCurrentEditNode: (node?: MyNode) => void;
};
