"use client";

import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

export default function Page() {
  return (
    <div className="h-screen">
      <ReactFlow>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
