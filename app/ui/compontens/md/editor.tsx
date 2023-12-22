import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

export type MdEditorProps = {
  onUpdate: (value: string) => void;
  className?: string;
  content?: string;
};

export default function MdEditor(props: MdEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
    content: props.content ?? "<p></p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      props.onUpdate(html);
    },
    injectCSS: true,
    onFocus: ({ editor, event }) => {
      console.log("focus");
      event.stopPropagation();
    },
  });

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} className={props.className} />;
}
