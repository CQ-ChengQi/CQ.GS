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
import clsx from "clsx";

export type MarkdownNodeProps = NodeProps<NodeData>;

export default function NoteNode(props: MarkdownNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const storeApi = useStoreApi();
  const state = storeApi.getState();
  const { currentEditNode } = useContext(ReactFlowContext);

  useEffect(() => {
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
    <div
      ref={nodeRef}
      className="focus:border focus:border-red-700 focus:border-solid"
    >
      <Handle type="target" position={Position.Left} className="" />
      <Handle type="source" position={Position.Right} className="" />

      <div
        className={clsx({
          "bg-white shadow sm:rounded-lg xl:w-full min-w-60 border": true,
          "cursor-text border-red-400 border-solid border":
            props.id === currentEditNode?.id,
          "border-blue-400 border-solid border": props.selected,
          "": true,
        })}
        onMouseDownCapture={handleMouseDown}
      >
        <div className="px-4 py-2">这是普通节点</div>
      </div>
    </div>
  );
}
