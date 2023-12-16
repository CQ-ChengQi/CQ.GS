"use client";

import MindMapProvider from "../ui/providers/mindmap-provider";

export default function DesignerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MindMapProvider>{children}</MindMapProvider>;
}
