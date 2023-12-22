"use client";

import { ReactFlowContext } from "@/app/lib/flow/context";
import { MyEdge, MyNode } from "@/app/lib/flow/types";
import React, { useCallback, useEffect, useState } from "react";
import { ReactFlowProvider } from "reactflow";
import { v4 as uuidv4 } from "uuid";
import ELK, { ElkNode } from "elkjs/lib/elk.bundled.js";

const elk = new ELK();

export function FlowEditorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [nodes, setNodes] = useState<Array<MyNode>>([
    {
      id: uuidv4(),
      type: "markdownNode",
      position: { x: 0, y: 0 },
      data: {
        content: "<h1>主题</h1>",
      },
      selected: true,
    },
  ]);
  const [edges, setEdges] = useState<Array<MyEdge>>([]);
  const [currentNode, setCurrentNode] = useState<MyNode>(nodes[0]);

  useEffect(() => {
    const graph = {
      id: "root",
      layoutOptions: {
        "elk.algorithm": "layered",
      },
      children: nodes.map((node) => ({
        id: node.id,
        width: node.width || 100,
        height: node.height || 50,
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        sources: [edge.source],
        targets: [edge.target],
      })),
    };

    if (graph != null) {
      elk.layout(graph).then(({ children, edges }) => {
        // const newNodes = children?.map((child) => ({
        //   ...nodes.find((n) => n.id === child.id),
        //   position: { x: child.x, y: child.y },
        // }));
        // setNodes(newNodes as Array<MyNode>);

        if (children) {
          const newNodes: Array<MyNode> = [];
          children.forEach((child) => {
            const item: MyNode | undefined = nodes.find(
              (n) => n.id === child.id
            );

            if (item) {
              item.position.x = child.x ?? 0;
              item.position.y = child.y ?? 0;
              newNodes.push(item);
            }
          });
          setNodes(newNodes);
        }
      });
    }
  }, []);

  const addNode = useCallback(() => {
    const id = uuidv4();
    const newNode: MyNode = {
      id: id,
      position: {
        x: currentNode.position.x + 300,
        y: 0,
      },
      data: {
        content: "<p>新的</p>",
      },
      selected: false,
      type: "markdownNode",
    };

    const newEdge: MyEdge = {
      id: uuidv4(),
      target: id,
      source: currentNode.id,
    };

    setNodes((s) => s.concat(newNode));
    setEdges((s) => s.concat(newEdge));

    return newNode;
  }, [currentNode]);

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
      }}
    >
      <ReactFlowProvider>{children}</ReactFlowProvider>
    </ReactFlowContext.Provider>
  );
}
