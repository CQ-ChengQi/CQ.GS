import React from "react";
import { MyNode, ReactFlowContextType } from "./types";

const defaultValue: ReactFlowContextType = {
  nodes: [],
  addNode: () => {},
};

export const ReactFlowContext = React.createContext(defaultValue);
