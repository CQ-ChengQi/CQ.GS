"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  IMyEdge,
  IMyNode,
  MindMapContext,
} from "../lib/stores/mindmap-context";
import { Edge, Node } from "reactflow";
import {
  NodeData,
  ReactFlowNode,
} from "../lib/stores/reactflow/reactflow-node";
import dagre from "@dagrejs/dagre";
import { ReactFlowEdge } from "../lib/stores/reactflow/reactflow-edge";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export default function DesignerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [nodes, setNodes] = useState<Array<ReactFlowNode>>([
    new ReactFlowNode({
      id: uuidv4(),
      position: {
        x: 0,
        y: 0,
      },
      data: {
        label: "根节点",
      },
      selected: true,
      type: "textUpdate",
    }),
  ]);
  const [edges, setEdges] = useState<Array<IMyEdge>>([]);
  const [currentSelectNode, setCurrentSelectNode] = useState<IMyNode>();

  const addNode = () => {
    if (!currentSelectNode) {
      return;
    }

    const id = uuidv4();
    const newNode = new ReactFlowNode({
      id: id,
      position: {
        x: 0,
        y: 0,
      },
      data: {
        label: "新节点",
      },
      selected: false,
      type: "textUpdate",
    });

    const newEdge = new ReactFlowEdge({
      id: uuidv4(),
      target: currentSelectNode.id,
      source: id,
    });

    setNodes((prevNodes) => [...prevNodes, newNode]);
    setEdges((prevEdges) => [...prevEdges, newEdge]);
  };
  const getNodes = () => {
    return nodes;
  };
  const removeNode = () => {};
  const getEdges = () => {
    return edges;
  };

  const setSelectNode = (node: IMyNode) => {
    setCurrentSelectNode(node);
  };

  const layout = () => {
    dagreGraph.setGraph({ rankdir: "TB" }); // TB for top to bottom graph

    nodes.forEach((item) => {
      dagreGraph.setNode(item.id, { width: 162, height: 47 });
    });

    edges.forEach((item) => {
      dagreGraph.setEdge(item.source, item.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const gnode = dagreGraph.node(node.id);
      node.setTargetPosition("top");
      node.setSourcePosition("bottom");
      node.setPosition({ x: gnode.x, y: gnode.y });
    });

    setNodes(nodes);
  };

  return (
    <MindMapContext.Provider
      value={{
        addNode,
        getNodes,
        removeNode,
        getEdges,
        currentSelectNode,
        setCurrentSelectNode: setSelectNode,
        layout,
      }}
    >
      {children}
    </MindMapContext.Provider>
  );
}
