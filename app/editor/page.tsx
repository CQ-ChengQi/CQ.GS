"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

export default function Page() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log(html);
    },
  });

  const handlerChange = (event: React.FormEvent<HTMLElement>) => {
    console.log(event);
  };

  return <EditorContent editor={editor} onChange={handlerChange} />;
}
