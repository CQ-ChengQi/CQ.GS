import { FlowEditorProvider } from "../ui/compontens/flow/provider";

export default function DiagramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FlowEditorProvider>{children}</FlowEditorProvider>;
}
