import { MyNode } from "@/app/lib/mindmap/types";
import ReactFlow, { Controls, Background, useReactFlow } from "reactflow";
import "reactflow/dist/base.css";
import MarkdownNode from "./nodes/markdown";
import { useEffect, useMemo } from "react";
import ButtonEdge from "./edges/ButtonEdge";

type FlowEditorProps = {
  nodes: Array<MyNode>;
};

export default function FlowEditor(props: FlowEditorProps) {
  const { nodes } = props;
  const reactFlowInstance = useReactFlow();

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

  return (
    <ReactFlow
      proOptions={{ hideAttribution: true }}
      nodes={nodes}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}
