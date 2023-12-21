import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export type MdEditorProps = {
  onUpdate: (value: string) => void;
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
    content: "<p>Hello World! 🌎️</p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      props.onUpdate(html);
    },
    injectCSS: false,
  });

  if (!editor) {
    return null;
  }

  const handlerChange = (event: React.FormEvent<HTMLElement>) => {
    console.log(event);
  };

  return <EditorContent editor={editor} onChange={handlerChange} />;
}
