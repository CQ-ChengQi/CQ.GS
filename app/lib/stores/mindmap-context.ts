import React from "react";
import { Edge, Node } from "reactflow";

export interface EdgeData {
  label: string;
}
export interface NodeData {
  label: string;
  width?: number;
  height?: number;
}

export type MyNode = Node<NodeData>;
export type MyEdge = Edge<EdgeData>;

export interface MindMapContextType {
  addNode: () => MyNode | void;
  // addEdge: (source: string, target: string) => void;
  removeNode: (id: string) => void;
  currentSelectNode: MyNode | undefined;
  setCurrentSelectNode: (
    value: React.SetStateAction<MyNode | undefined>
  ) => void;
  layout: () => void;
  nodes: Array<MyNode>;
  setNodes: (value: React.SetStateAction<MyNode[]>) => void;
  edges: Array<MyEdge>;
  setEdges: (value: React.SetStateAction<MyEdge[]>) => void;
}

export const defaultState: MindMapContextType = {
  addNode: () => {},
  // addEdge: (source: string, target: string) => {},
  removeNode: (id: string) => {},
  currentSelectNode: undefined,
  setCurrentSelectNode: (value: React.SetStateAction<MyNode | undefined>) => {},
  layout: () => {},
  nodes: [],
  setNodes: (value: React.SetStateAction<MyNode[]>) => {},
  edges: [],
  setEdges: (value: React.SetStateAction<MyEdge[]>) => {},
};

export const MindMapContext = React.createContext(defaultState);
