import { EdgeData, MyEdge, MyNode, NodeData } from "@/app/lib/flow/types";
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
  useEdgesState,
  useNodesState,
  useNodes,
  isNode,
  isEdge,
} from "reactflow";
import "reactflow/dist/base.css";

import MarkdownNode from "./nodes/markdown";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import ButtonEdge from "./edges/ButtonEdge";
import ButtonGroups from "../common/button-groups";
import UserAvatars from "../common/user-avatars";
import { ReactFlowContext } from "@/app/lib/flow/context";
import { v4 as uuidv4 } from "uuid";
import { ElkMindMap } from "@/app/lib/flow/elk-mindmap";

export default function FlowEditor() {
  const reactFlowInstance = useReactFlow();
  const currentNode = useRef<MyNode>();
  const [edges, setEdges, onEdgesChange] = useEdgesState<EdgeData>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>([]);
  const ekl = useRef<ElkMindMap>(new ElkMindMap());
  const { setCurrentEditNode } = useContext(ReactFlowContext);

  useEffect(() => {
    setNodes(ekl.current.getNodes());
  }, [setNodes]);

  const lPressed = useKeyPress("L");
  useEffect(() => {
    if (lPressed) {
      ekl.current.layout();
      setNodes(ekl.current.getNodes());
    }
  }, [lPressed, setNodes]);

  const tabPressed = useKeyPress("Tab");
  useEffect(() => {
    if (tabPressed) {
      if (!currentNode.current) return;

      const id = uuidv4();
      const newNode: MyNode = {
        id: id,
        position: {
          x: 0,
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
        source: currentNode.current.id,
      };
      reactFlowInstance.addNodes(newNode);
      reactFlowInstance.addEdges(newEdge);

      // ekl.current.setEdges(edges);
      // ekl.current.setNodes(nodes);
    }
  }, [tabPressed, reactFlowInstance, setNodes]);

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
      // setCurrentSelectedNode(node);
      // console.log(node);
    },
    []
  );

  const hanldeNodeDoubleClick = useCallback(
    (event: React.MouseEvent, node: MyNode) => {
      setCurrentEditNode(node);
    },
    [setCurrentEditNode]
  );

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds: MyNode[]) => applyNodeChanges<NodeData>(changes, nds));
    },
    [setNodes]
  );

  const handlePanelClick = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      setCurrentEditNode();
    },
    [setCurrentEditNode]
  );

  return (
    <ReactFlow
      proOptions={{ hideAttribution: true }}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onNodeClick={hanldeNodeClick}
      nodes={nodes}
      onNodesChange={handleNodesChange}
      onNodeDoubleClick={hanldeNodeDoubleClick}
      edges={edges}
      onPaneClick={handlePanelClick}
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
