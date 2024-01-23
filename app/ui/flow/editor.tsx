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
import { DagreMindmap } from "@/app/lib/flow/dagre-mindmap";
import NoteNode from "./nodes/note";

const initNodes: Array<MyNode> = [
  {
    id: "root",
    type: "markdownNode",
    position: { x: 0, y: 0 },
    data: {
      content: "<h1>主题</h1>",
    },
    focusable: false,
  },
  {
    id: "root2",
    type: "markdownNode",
    position: { x: 300, y: -200 },
    data: {
      content: "<h1>主题2</h1>",
    },
    focusable: false,
    parentNode: "root",
  },
  {
    id: "root3",
    type: "markdownNode",
    position: { x: 300, y: 200 },
    data: {
      content: "<h1>主题3</h1>",
    },
    focusable: false,
    parentNode: "root",
  },
  {
    id: "root4",
    type: "markdownNode",
    position: { x: 600, y: 400 },
    data: {
      content: "<h1>主题4</h1>",
    },
    focusable: false,
    parentNode: "root",
  },
];

const initEdges: Array<MyEdge> = [
  {
    id: uuidv4(),
    source: "root",
    target: "root2",
  },
  {
    id: uuidv4(),
    source: "root",
    target: "root3",
  },
  {
    id: uuidv4(),
    source: "root",
    target: "root4",
  },
];

export default function FlowEditor() {
  const reactFlowInstance = useReactFlow();
  const currentNode = useRef<MyNode>();
  const [edges, setEdges, onEdgesChange] = useEdgesState<EdgeData>(initEdges);
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>(initNodes);

  const elk = useRef<ElkMindMap>(new ElkMindMap(initNodes, initEdges));
  const dagre = useRef<DagreMindmap>(new DagreMindmap());
  const { setCurrentEditNode } = useContext(ReactFlowContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // elk.current.layout();
      // setNodes(ekl.current.getNodes());
      dagre.current.layout();
      reactFlowInstance.setNodes(dagre.current.getNodes());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [reactFlowInstance]);

  useEffect(() => {
    // elk.current.setNodes(nodes);
    dagre.current.setNode(nodes);
    dagre.current.setEdge(edges);
  }, [nodes, edges]);

  const tabPressed = useKeyPress("Tab");
  useEffect(() => {
    if (tabPressed) {
      if (!currentNode.current) {
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
          content: "<p>新的</p>",
        },
        selected: false,
        type: "markdownNode",
        parentNode: currentNode.current.id,
      };

      const newEdge: MyEdge = {
        id: uuidv4(),
        target: id,
        source: currentNode.current.id,
      };

      reactFlowInstance.addNodes(newNode);
      reactFlowInstance.addEdges(newEdge);
    }

    return () => {};
  }, [tabPressed, reactFlowInstance]);

  useEffect(() => {
    reactFlowInstance.setCenter(0, 0, { zoom: 1 });
  }, [reactFlowInstance]);

  const nodeTypes = useMemo(
    () => ({
      markdownNode: MarkdownNode,
      noteNode: NoteNode,
    }),
    []
  );

  const edgeTypes = useMemo(
    () => ({
      myEdge: ButtonEdge,
    }),
    []
  );

  const hanldeNodeClick = useCallback(
    (event: React.MouseEvent, node: MyNode) => {
      currentNode.current = node;
      setCurrentEditNode(node);
      console.log(node);
    },
    [setCurrentEditNode]
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
    <div className="w-full h-screen">
      <ReactFlow
        proOptions={{ hideAttribution: false }}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={hanldeNodeClick}
        nodes={nodes}
        onNodesChange={onNodesChange}
        onNodeDoubleClick={hanldeNodeDoubleClick}
        edges={edges}
        onPaneClick={handlePanelClick}
      >
        <Background variant={BackgroundVariant.Dots} />
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
    </div>
  );
}
