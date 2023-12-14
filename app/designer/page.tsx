"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import {
  MindMapContext,
  MyEdge,
  MyNode,
  NodeData,
} from "../lib/stores/mindmap-context";
import ReactFlow, {
  Background,
  Connection,
  Controls,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useKeyPress,
  useReactFlow,
} from "reactflow";

import BlockNote from "../ui/components/flow-nodes/block-note";

import "reactflow/dist/base.css";

const nodeTypes = { blockNote: BlockNote };

function DesignerPage() {
  const {
    nodes,
    setCurrentSelectNode,
    addNode,
    setNodes,
    edges,
    setEdges,
    layout,
  } = useContext(MindMapContext);
  const reactFlowInstance = useReactFlow();

  useEffect(() => {
    if (reactFlowInstance) {
      reactFlowInstance.setCenter(0, 0, { zoom: 1 });
    }
  }, [reactFlowInstance]);

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setCurrentSelectNode(node);
  };

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds: MyNode[]) => applyNodeChanges<NodeData>(changes, nds));
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds: MyEdge[]) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const onNodeDragStop = useCallback(
    (event: any, node: Node, nodes: Node[]) => {
      // layout();
    },
    []
  );

  const tabPressed = useKeyPress("Tab");
  useEffect(() => {
    if (tabPressed) {
      var newNode = addNode();
      // if (newNode) {
      //   reactFlowInstance.setCenter(newNode.position.x, newNode.position.y, {
      //     zoom: 1,
      //   });
      // }
    }
  }, [tabPressed, addNode, reactFlowInstance]);

  const mPressed = useKeyPress("m");
  const [minMap, setMinMap] = useState(false);
  useEffect(() => {
    setMinMap(mPressed);
  }, [mPressed]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeDragStop={onNodeDragStop}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      proOptions={{ hideAttribution: true }}
    >
      <Background />
      {minMap && <MiniMap />}
    </ReactFlow>
  );
}

export default function Page() {
  return (
    <ReactFlowProvider>
      <DesignerPage />
    </ReactFlowProvider>
  );
}
