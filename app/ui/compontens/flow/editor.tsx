import { MyNode } from "@/app/lib/mindmap/types";
import ReactFlow, {
  Controls,
  Background,
  useReactFlow,
  BackgroundVariant,
  ControlButton,
  Panel,
} from "reactflow";
import "reactflow/dist/base.css";

import MarkdownNode from "./nodes/markdown";
import React, { useCallback, useEffect, useMemo } from "react";
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

  const hanldNodeClick = useCallback(
    (event: React.MouseEvent, node: MyNode) => {},
    []
  );

  return (
    <ReactFlow
      proOptions={{ hideAttribution: true }}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onNodeClick={hanldNodeClick}
      {...props}
    >
      <Background variant={BackgroundVariant.Lines} />
      <Controls>
        <ControlButton
          onClick={() => alert("Something magical just happened. ✨")}
        ></ControlButton>
      </Controls>
      <Panel position="top-left">
        <span className="isolate inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            Markdown
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            MindMap
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            Days
          </button>
        </span>
      </Panel>
      <Panel position="top-right">
        <a href="#" className="group block flex-shrink-0">
          <div className="flex items-center">
            <div></div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                Tom Cook
              </p>
              <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                View profile
              </p>
            </div>
          </div>
        </a>
      </Panel>
      <Panel position="bottom-center">2</Panel>
    </ReactFlow>
  );
}
