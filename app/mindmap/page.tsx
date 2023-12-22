"use client";

import { useContext } from "react";
import FlowEditor from "../ui/compontens/flow/editor";
import { ReactFlowContext } from "../lib/flow/context";

export default function Page() {
  const { nodes, addNode } = useContext(ReactFlowContext);

  return (
    <div className="w-full h-screen">
      <FlowEditor nodes={nodes} />
    </div>
  );
}
