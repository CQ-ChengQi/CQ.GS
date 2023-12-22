import { NodeData } from "@/app/lib/flow/types";
import React from "react";
import { Handle, NodeProps, NodeToolbar, Position } from "reactflow";
import MdEditor from "../../md/editor";

export type MarkdownNodeProps = NodeProps<NodeData>;

export default function MarkdownNode(props: MarkdownNodeProps) {
  const handleUpdate = (val: string) => {
    console.log(val);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div>
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
