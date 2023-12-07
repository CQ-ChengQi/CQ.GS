"use client";

import { useCallback, useContext, useEffect } from "react";
import { MindMapContext } from "../lib/stores/mindmap-context";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  ReactFlowProvider,
  getRectOfNodes,
  useKeyPress,
  useNodesState,
} from "reactflow";
import {
  NodeData,
  ReactFlowNode,
} from "../lib/stores/reactflow/reactflow-node";
import FlowTextUpdateNode from "../ui/components/flow-nodes/text-update-node";

import "reactflow/dist/base.css";

const nodeTypes = { textUpdate: FlowTextUpdateNode };

function DesignerPage() {
  const { getNodes, setCurrentSelectNode, addNode, layout } =
    useContext(MindMapContext);

  // 将 IMyNode 转换为 Node<NodeData>
  const getReactFlowNodes = () => {
    const nodes = getNodes().map((node) => node as ReactFlowNode);
    return nodes.map((node) => node.originNode as Node<NodeData>);
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(getReactFlowNodes());

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setCurrentSelectNode(new ReactFlowNode(node));
  };

  const tabPressed = useKeyPress("Tab");

  useEffect(() => {
    if (tabPressed) {
      addNode();
    }
  }, [tabPressed, addNode]);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onNodeClick={onNodeClick}
    >
      <Background />
      <MiniMap />
      <Controls />
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
