"use client";

import { useCallback, useState, MouseEvent, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  NodeChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Node,
  EdgeChange,
  Edge,
  Connection,
  useKeyPress,
  KeyCode,
} from "reactflow";
import "reactflow/dist/base.css";

import { initialEdges, initialNodes, nodeTypes } from "../lib/data";

export default function Page() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const tabPressed = useKeyPress("Tab", {});

  if (tabPressed) {
    console.log("Tab");
  }

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    changes
      .filter((s) => s.type === "select" && !s.selected)
      .map((s) => {
        console.log(s);
      });
    setNodes((nds: Node[]) => applyNodeChanges(changes, nds));
  }, []);
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onSelectionKey = useCallback((key: KeyCode | null | undefined) => {},
  []);

  const onNodeSelect = useCallback((event: MouseEvent, node: Node) => {}, []);

  // const spacePressed = useKeyPress("Space");
  // const cmdAndSPressed = useKeyPress(["Meta+s", "Strg+s"]);
  const miniMapRressed = useKeyPress("m", {});

  return (
    <div className="h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onNodeClick={onNodeSelect}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        {miniMapRressed && <MiniMap />}
      </ReactFlow>
    </div>
  );
}
