"use client";

import { ReactFlowContext } from "@/app/lib/mindmap/context";
import { MyNode } from "@/app/lib/mindmap/types";
import { tree } from "next/dist/build/templates/app-page";
import React, { useState } from "react";
import { ReactFlowProvider } from "reactflow";

export function FlowEditorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [nodes, setNodes] = useState<Array<MyNode>>([
    {
      id: "1",
      type: "markdownNode",
      position: { x: 0, y: 0 },
      data: {
        label: "Md",
      },
      selected: true,
    },
  ]);

  const addNode = () => {};

  return (
    <ReactFlowContext.Provider
      value={{
        nodes: nodes,
        addNode: addNode,
      }}
    >
      <ReactFlowProvider>{children}</ReactFlowProvider>
    </ReactFlowContext.Provider>
  );
}
