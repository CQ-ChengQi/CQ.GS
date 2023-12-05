"use client";

import { useCallback, useState, MouseEvent, useEffect, useRef } from "react";
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
  useReactFlow,
  ReactFlowProvider,
  NodeSelectionChange,
} from "reactflow";
import "reactflow/dist/base.css";

import {
  addNode,
  getEdges,
  getNodeTypeList,
  getNodes,
  selecteNode,
} from "../lib/mindmap-data";
import { NodeData } from "../lib/models/node-data";

function Flow() {
  const connectingNodeId = useRef(null);
  const nodeList: Node<NodeData>[] = [];

  const [nodes, setNodes] = useState(nodeList);
  const [edges, setEdges] = useState(getEdges());
  const [currentNode, setCurrentNode] = useState();

  const { screenToFlowPosition } = useReactFlow();
  // const { once, setOnce } = useState(true);

  const tabPressed = useKeyPress("Tab");

  useEffect(() => {
    if (tabPressed) {
      addNode();
      setNodes(getNodes());
    }
  }, [tabPressed]);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback((event: any) => {
    if (!connectingNodeId.current) {
      return;
    }

    console.log(event);
  }, []);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    changes
      .filter((s) => s.type === "select" && s.selected)
      .map((s) => {
        const nodeSelectionChange = s as NodeSelectionChange;
        selecteNode(nodeSelectionChange.id);
      });
    // setNodes((nds: Node[]) => applyNodeChanges(changes, nds));
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
        onConnectStart={onConnectStart}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        nodeTypes={getNodeTypeList()}
        fitView
      >
        <Background />
        <Controls />
        {miniMapRressed && <MiniMap />}
      </ReactFlow>
    </div>
  );
}

export default function Page() {
  return (
    <ReactFlowProvider>
      <Flow></Flow>
    </ReactFlowProvider>
  );
}
