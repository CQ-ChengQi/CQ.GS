import { MilkdownProvider } from "@milkdown/react";
import { MilkdownEditor } from "../ui/components/markdown/md-mikdown";

export default function Page() {
  return (
    <MilkdownProvider>
      <MilkdownEditor />
    </MilkdownProvider>
  );
}
