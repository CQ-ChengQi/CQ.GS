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
import Katext from "katex";

import "katex/dist/katex.min.css";

function ResizeIcon({ props }: { props: string }) {
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
      {...{ props }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="16 20 20 20 20 16" />
      <line x1="14" y1="14" x2="20" y2="20" />
      <polyline points="8 4 4 4 4 8" />
      <line x1="4" y1="4" x2="10" y2="10" />
    </svg>
  );
}

export default function BlockNote({
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

  const html = Katext.renderToString("x^2 + b - c", {
    throwOnError: false,
  });

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
      <div className="bg-white shadow sm:rounded-lg min-h-full">
        <div className="px-4 py-5 sm:p-6">
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p dangerouslySetInnerHTML={{ __html: html }}></p>
          </div>
        </div>
      </div>

      <div ref={nodeRef} className="">
        <Handle
          type="source"
          position={Position.Left}
          className="h-6 w-6 !bg-slate-400"
        />
        <Handle
          type="target"
          position={Position.Right}
          className="h-6 w-6 !bg-slate-400"
        />
      </div>

      <NodeResizeControl onResizeEnd={onResizeEnd}>
        <ResizeIcon />
      </NodeResizeControl>
    </>
  );
}
