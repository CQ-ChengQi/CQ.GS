import React from "react";

export interface IMyPostion {
  x: number;
  y: number;
}

export interface IMyNode {
  id: string;
  originNode: any;
  setPosition(pos: IMyPostion): void;
  setTargetPosition(targetPos: "top" | "bottom" | "left" | "right"): void;
  setSourcePosition(sourcePos: "top" | "bottom" | "left" | "right"): void;
}

export interface IMyEdge {
  id: string;
  source: string;
  target: string;
  originEdge: any;
}

export interface MindMapContextType {
  addNode: () => void;
  removeNode: (id: string) => void;
  getNodes: () => Array<IMyNode>;
  getEdges: () => Array<IMyEdge>;
  currentSelectNode: IMyNode | undefined;
  setCurrentSelectNode: (node: IMyNode) => void;
  layout: () => void;
}

const defaultState: MindMapContextType = {
  addNode: () => {},
  removeNode: (id: string) => {},
  getNodes: () => [],
  getEdges: () => [],
  currentSelectNode: undefined,
  setCurrentSelectNode: (node: IMyNode) => {},
  layout: () => {},
};

export const MindMapContext = React.createContext(defaultState);
