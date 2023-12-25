import React from "react";
import { MyEdge, MyNode, ReactFlowContextType } from "./types";

const defaultValue: ReactFlowContextType = {
  nodes: [],
  edges: [],
  setNodes: (value: React.SetStateAction<MyNode[]>) => {},
  setEdges: (value: React.SetStateAction<MyEdge[]>) => {},
  addNode: () => {},
  setCurrentSelectedNode: (node: MyNode) => {},
  setCurrentEditNode: function (node?: MyNode): void {},
};

export const ReactFlowContext = React.createContext(defaultValue);
