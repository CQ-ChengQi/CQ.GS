"use client";

import { ReactFlowContext } from "@/app/lib/flow/context";
import { ElkMindMap } from "@/app/lib/flow/elk-mindmap";
import { EdgeData, MyEdge, MyNode, NodeData } from "@/app/lib/flow/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useStoreApi,
} from "reactflow";
import { v4 as uuidv4 } from "uuid";

export function FlowEditorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [edges, setEdges, onEdgesChange] = useEdgesState<EdgeData>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>([]);

  const [currentNode, setCurrentNode] = useState<MyNode>(nodes[0]);
  const [currentEditNode, setCurrentEditNode] = useState<MyNode>();

  const ekl = useRef<ElkMindMap>(new ElkMindMap());

  useEffect(() => {
    setNodes(ekl.current.getNodes());
  }, [setNodes]);

  const addNode = useCallback(() => {}, []);

  const setCurrentSelectedNode = (node: MyNode) => {
    setCurrentNode(node);
  };

  return (
    <ReactFlowContext.Provider
      value={{
        nodes: nodes,
        addNode: addNode,
        edges: edges,
        setNodes: setNodes,
        setEdges: setEdges,
        setCurrentSelectedNode: setCurrentSelectedNode,
        currentEditNode: currentEditNode,
        setCurrentEditNode: setCurrentEditNode,
      }}
    >
      <ReactFlowProvider>{children}</ReactFlowProvider>
    </ReactFlowContext.Provider>
  );
}
