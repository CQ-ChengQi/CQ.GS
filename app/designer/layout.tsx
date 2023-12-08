"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  EdgeData,
  MindMapContext,
  MyEdge,
  MyNode,
  NodeData,
} from "../lib/stores/mindmap-context";
import { Edge, Node, Position } from "reactflow";
import dagre from "@dagrejs/dagre";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export default function DesignerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [nodes, setNodes] = useState<Array<Node<NodeData>>>([
    {
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
    },
  ]);

  const [edges, setEdges] = useState<Array<MyEdge>>([]);
  const [currentSelectNode, setCurrentSelectNode] = useState<MyNode>();

  const nodesRef = useRef<Array<MyNode>>(nodes);
  const edgesRef = useRef<Array<MyEdge>>(edges);
  const currentSelectNodeRef = useRef<MyNode | undefined>(currentSelectNode);

  useEffect(() => {
    currentSelectNodeRef.current = currentSelectNode;
  }, [currentSelectNode]);

  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  const layout = useCallback(() => {
    dagreGraph.setGraph({ rankdir: "RL", align: "UL" });
    nodesRef.current.forEach((item) => {
      console.log(item);
      dagreGraph.setNode(item.id, {
        width: item.data.width ?? 0,
        height: item.data.height ?? 0,
      });
    });

    edgesRef.current.forEach((item) => {
      dagreGraph.setEdge(item.source, item.target, { width: 200 });
    });

    dagre.layout(dagreGraph);

    nodesRef.current.forEach((node) => {
      const gnode = dagreGraph.node(node.id);
      node.position = { x: gnode.x - 162 / 2, y: gnode.y - 47 / 2 };
      node.targetPosition = Position.Right;
      node.sourcePosition = Position.Left;
    });

    setNodes(nodesRef.current);
    setEdges(edgesRef.current);
  }, []);

  const addNode = useCallback(() => {
    if (!currentSelectNodeRef.current) {
      return;
    }

    const id = uuidv4();
    const newNode: MyNode = {
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
    };

    const newEdge: MyEdge = {
      id: uuidv4(),
      target: currentSelectNodeRef.current?.id,
      source: id,
    };

    nodesRef.current = nodesRef.current.concat(newNode);
    edgesRef.current = edgesRef.current.concat(newEdge);

    layout();

    return newNode;
  }, [layout]);

  const removeNode = () => {};

  return (
    <MindMapContext.Provider
      value={{
        addNode,
        removeNode,
        currentSelectNode,
        setCurrentSelectNode,
        layout,
        nodes,
        setNodes,
        edges,
        setEdges,
      }}
    >
      {children}
    </MindMapContext.Provider>
  );
}
