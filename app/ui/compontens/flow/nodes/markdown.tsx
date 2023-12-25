import { NodeData } from "@/app/lib/flow/types";
import React, { useContext, useEffect, useRef } from "react";
import {
  Handle,
  NodeProps,
  NodeToolbar,
  Position,
  useStoreApi,
  useUpdateNodeInternals,
} from "reactflow";
import MdEditor from "../../md/editor";
import { ReactFlowContext } from "@/app/lib/flow/context";

export type MarkdownNodeProps = NodeProps<NodeData>;

export default function MarkdownNode(props: MarkdownNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const storeApi = useStoreApi();
  const state = storeApi.getState();
  const { currentEditNode } = useContext(ReactFlowContext);

  useEffect(() => {
    // const { width, height } = nodeRef.current?.getBoundingClientRect();
    if (nodeRef.current) {
      state.updateNodeDimensions([
        { id: props.id, nodeElement: nodeRef.current },
      ]);
    }
  }, [nodeRef, props.id, state]);

  const handleUpdate = (val: string) => {
    console.log(val);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (props.id === currentEditNode?.id) {
      event.stopPropagation();
    }
  };

  return (
    <div ref={nodeRef}>
      <Handle type="target" position={Position.Left} className="" />
      <Handle type="source" position={Position.Right} className="" />

      <div
        className="bg-white shadow sm:rounded-lg cursor-text xl:w-full min-w-60 "
        onMouseDownCapture={handleMouseDown}
      >
        <div className="px-4 py-2">
          <MdEditor onUpdate={handleUpdate} content={props.data.content} />
        </div>
      </div>
    </div>
  );
}
