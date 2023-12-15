import { Editor, rootCtx } from "@milkdown/core";
import { commonmark } from "@milkdown/preset-commonmark";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { nord } from "@milkdown/theme-nord";

import "@milkdown/theme-nord/style.css";

const MilkdownEditor: React.FC = () => {
  useEditor((root) =>
    Editor.make()
      .config(nord)
      .config((ctx) => {
        ctx.set(rootCtx, root);
      })
      .use(commonmark)
  );

  return <Milkdown />;
};

export default function MilkdownEditorWrapper() {
  return (
    <MilkdownProvider>
      <MilkdownEditor />
    </MilkdownProvider>
  );
}
