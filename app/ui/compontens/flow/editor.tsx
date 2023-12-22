import { MyNode, NodeData } from "@/app/lib/flow/types";
import ReactFlow, {
  Controls,
  Background,
  useReactFlow,
  BackgroundVariant,
  ControlButton,
  Panel,
  applyNodeChanges,
  NodeChange,
  useKeyPress,
} from "reactflow";
import "reactflow/dist/base.css";

import MarkdownNode from "./nodes/markdown";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import ButtonEdge from "./edges/ButtonEdge";
import ButtonGroups from "../common/button-groups";
import UserAvatars from "../common/user-avatars";
import { ReactFlowContext } from "@/app/lib/flow/context";

export default function FlowEditor() {
  const reactFlowInstance = useReactFlow();

  const { nodes, edges, setNodes, setCurrentSelectedNode, addNode } =
    useContext(ReactFlowContext);

  const tabPressed = useKeyPress("Tab");
  useEffect(() => {
    if (tabPressed) {
      var newNode = addNode();
    }
  }, [tabPressed, addNode]);

  useEffect(() => {
    reactFlowInstance.setCenter(0, 0, { zoom: 1 });
  }, [reactFlowInstance]);

  const nodeTypes = useMemo(() => {
    return {
      markdownNode: MarkdownNode,
    };
  }, []);

  const edgeTypes = useMemo(() => {
    return {
      myEdge: ButtonEdge,
    };
  }, []);

  const hanldeNodeClick = useCallback(
    (event: React.MouseEvent, node: MyNode) => {
      setCurrentSelectedNode(node);
      console.log(node);
    },
    [setCurrentSelectedNode]
  );

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds: MyNode[]) => applyNodeChanges<NodeData>(changes, nds));
    },
    [setNodes]
  );

  return (
    <ReactFlow
      proOptions={{ hideAttribution: true }}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onNodeClick={hanldeNodeClick}
      nodes={nodes}
      onNodesChange={handleNodesChange}
      edges={edges}
    >
      <Background variant={BackgroundVariant.Lines} />
      <Controls>
        <ControlButton
          onClick={() => alert("Something magical just happened. ✨")}
        >
          1
        </ControlButton>
        <ControlButton
          onClick={() => alert("Something magical just happened. ✨")}
        >
          2
        </ControlButton>
      </Controls>
      <Panel position="top-left">
        <ButtonGroups />
      </Panel>
      <Panel position="top-right">
        <UserAvatars />
      </Panel>
    </ReactFlow>
  );
}
