import { NodeData } from "@/app/lib/mindmap/types";
import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import MdEditor from "../../md/editor";

export type MarkdownNodeProps = NodeProps<NodeData>;

export default function MarkdownNode(props: MarkdownNodeProps) {
  const handleUpdate = (val: string) => {
    console.log(val);
  };

  return (
    <>
      <Handle type="target" position={Position.Left} className="bg-slate-300" />
      <Handle
        type="source"
        position={Position.Right}
        className="bg-slate-300"
      />

      <div className="bg-white shadow sm:rounded-lg w-60">
        <div className="px-4 py-5 sm:p-6">
          <MdEditor onUpdate={handleUpdate} />
        </div>
      </div>
    </>
  );
}
