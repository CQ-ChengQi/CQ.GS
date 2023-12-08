import { classNames } from "@/app/lib/utils";
import {
  Handle,
  NodeResizeControl,
  NodeResizer,
  Position,
  ResizeDragEvent,
  ResizeParams,
  useUpdateNodeInternals,
} from "reactflow";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useCallback, useEffect, useRef } from "react";

function ResizeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#ff0071"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ position: "absolute", right: 5, bottom: 5 }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="16 20 20 20 20 16" />
      <line x1="14" y1="14" x2="20" y2="20" />
      <polyline points="8 4 4 4 4 8" />
      <line x1="4" y1="4" x2="10" y2="10" />
    </svg>
  );
}

export default function FlowTextUpdateNode({
  id,
  data,
  isConnectable,
  selected,
}: {
  id: string;
  data: any;
  isConnectable: boolean;
  selected: boolean;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    if (nodeRef.current) {
      const { width, height } = nodeRef.current.getBoundingClientRect();

      if (data.width !== width || data.height !== height) {
        data.width = width;
        data.height = height;
        updateNodeInternals(id);
      }
    }
  }, [id, data, updateNodeInternals]);

  const onResizeEnd = useCallback(
    (event: ResizeDragEvent, params: ResizeParams) => {
      data.width = params.width;
      data.height = params.height;
      updateNodeInternals(id);
    },
    [id, data, updateNodeInternals]
  );

  return (
    <>
      <NodeResizeControl onResizeEnd={onResizeEnd}>
        <ResizeIcon />
      </NodeResizeControl>
      <div
        ref={nodeRef}
        className="flex rounded-md shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-full"
      >
        <div
          className={classNames(
            "bg-pink-600",
            "flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white",
            clsx(selected && "bg-pink-900")
          )}
        >
          {selected ? "T" : "F"}
        </div>
        <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
          <div className="flex-1 truncate px-4 py-2 text-sm">
            <span className="font-medium text-gray-900 hover:text-gray-600">
              {/* <input className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background "></input> */}
              {data.label}
            </span>
            <p className="text-gray-500">1 成员</p>
          </div>
        </div>
        <Handle type="source" position={Position.Left} />
        <Handle type="target" position={Position.Right} />
      </div>
    </>
  );
}
