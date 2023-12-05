import { classNames } from "@/app/lib/utils";
import { Handle, Position } from "reactflow";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export default function FlowTextUpdateNode({
  data,
  isConnectable,
  selected,
}: {
  data: any;
  isConnectable: boolean;
  selected: boolean;
}) {
  return (
    <div className="flex rounded-md shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
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
            {/* <input
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background "
              value={data.label}
            ></input> */}
            {data.label}
          </span>
          <p className="text-gray-500">1 成员</p>
        </div>
      </div>
      <Handle type="source" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
    </div>
  );
}
