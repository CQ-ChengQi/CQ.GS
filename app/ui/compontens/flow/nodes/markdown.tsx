import { NodeData } from "@/app/lib/mindmap/types";
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
      <Handle type="target" position={Position.Left} className="bg-slate-300" />
      <Handle
        type="source"
        position={Position.Right}
        className="bg-slate-300"
      />

      <div
        className="bg-white shadow sm:rounded-lg cursor-text xl:w-full "
        onMouseDownCapture={handleMouseDown}
      >
        <div className="px-4 py-5 sm:p-6">
          <MdEditor onUpdate={handleUpdate} />
        </div>
      </div>
    </div>
  );
}
