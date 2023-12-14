"use client";

import MdProvider from "../ui/providers/md-provider";
import MindMapProvider from "../ui/providers/mindmap-provider";

export default function DesignerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MindMapProvider>
      <MdProvider>{children}</MdProvider>
    </MindMapProvider>
  );
}
